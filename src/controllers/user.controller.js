import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

//token generator function
const generateTokens = async (id) => {
    try {
        const user = await User.findById(id);
        const accessToken = await user.generateAccessToken();
        //adding refreshToken in user database
        return accessToken;
    } catch (err) {
        console.log("Error while generating token", err);
        throw new ApiError(500, "SOmething went wrong while generating");
    }
};

//register user controller
export const registerUser = asyncHandler(async (req, res) => {
    //steps for register user:
    //get user detail form body
    //check for empty and trim
    //check for duplicate
    //check for avatar or cover image files
    //if files then store to db
    //if data stored in db so get response
    //do not keep password refresh token in user object
    //check for user creation and return res with user detail and access token

    let { email, username, fullName, password } = req.body;

    if (!(email && username && fullName && password)) {
        return res
            .status(400)
            .json(new ApiResponse(400, "some credentials missing."));
    }
    //trim and convert to lowercase:
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();
    fullName = fullName.trim();
    //check for empty input
    if ([username, email, password, fullName].some((field) => field === "")) {
        return res
            .status(400)
            .json(new ApiResponse(400, "some credentials missing!!!."));
    }

    //check for duplicate user:
    const userDuplicate = await User.findOne({
        $or: [{ email }, { username }],
    });
    console.log(userDuplicate);
    if (userDuplicate) {
        throw new ApiError(409, "user all ready exists.");
    }

    //create user
    const newUser = await User.create({
        fullName,
        email,
        password,
        username,
    });
    if (!newUser)
        throw new ApiError(500, "something went wrong while registering user.");
    console.log(newUser);
    //check for user created or not:
    const userCreated = await User.findById(newUser._id).select("-password");
    if (!userCreated)
        throw new ApiError(500, "something went wrong while registering user.");

    //send success response
    res.status(201).json(
        new ApiResponse(201, "user registered successfully.", userCreated)
    );
});

//login user controller
export const loginUser = asyncHandler(async (req, res) => {
    //get the login details -> email or username
    //trim input
    //check for valid input
    //check for user exists with email or username
    //generate tokens
    //send user details with tokens

    let { email, username, password } = req.body;

    // Trim and normalize inputs
    email = email ? email.trim().toLowerCase() : null;
    username = username ? username.trim().toLowerCase() : null;
    password = password ? password.trim() : null;

    //check for details
    if ((!email && !username) || !password) {
        throw new ApiError(400, "missing credentials for login user.");
    }

    //get user
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(404, "User not found.");
    if (user.isDeleted) throw new ApiError(404, "user deleted not found.");
    //verify password:
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials.");

    //generate tokens:
    const accessToken = await generateTokens(user._id);
    if (!accessToken) {
        console.log("token generation failed.");
        throw new ApiError(500, "something went wrong.");
    }
    //get the loggedUser
    const loggedUser = await User.findById(user._id).select("-password");

    //send response to user with loggedUser with tokens and tokens in cookies:
    return res.status(200).json(
        new ApiResponse(200, "User logged in successfully.", {
            user: loggedUser,
            accessToken,
        })
    );
});

//get current user controller:
export const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!req.user) throw new ApiError("401", "invalid access.");
    if (!userId) throw new ApiError(400, "bad request id required!!!");
    if (userId !== req.user.id) throw new ApiError(401, "invalid access!!!");
    const user = await User.findById(userId).select("-password");
    return res
        .status(200)
        .json(new ApiResponse(200, "current user fetched successfully ", user));
});

//get all user:
export const getAllUser = asyncHandler(async (req, res) => {
    if (!req.user) throw new ApiError(401, "invalid access!!!");
    const userData = await User.find().select("-password");
    return res
        .status(200)
        .json(new ApiResponse(200, "All user fetched successfully ", userData));
});
//update account details like username or email
export const updateAccount = asyncHandler(async (req, res) => {
    let { username, fullName } = req.body;

    //validate details
    username = username ? username.trim().toLowerCase() : null;
    fullName = fullName ? fullName.trim().toLowerCase() : null;

    //check if both not given
    if (!username && !fullName)
        throw new ApiError(400, "valid credentials required.");
    //check for duplicate username
    const userDuplicate = await User.findOne({ username });
    if (userDuplicate)
        throw new ApiError("409", "username all ready taken try with new one.");

    //find user an update
    const user = await User.findById(req.user._id).select("-password ");
    if (username) {
        user.username = username;
    }
    if (fullName) {
        user.fullName = fullName;
    }
    const updatedUser = await user.save({ validateBeforeSave: false });

    return res
        .status(201)
        .json(new ApiResponse(201, "user updated successfully.", updatedUser));
});


//get the user channel profile

//delete user (soft delete by isDeleted field.)
export const deleteUser = asyncHandler(async (req, res) => {
    if (!req.params.userId)
        throw new ApiError(400, "bad request id required!!!");
    const userId = req.params.userId;
    if (!req.user) throw new ApiError(404, "unauthorized user.");
    const user = await User.findById(userId).select("-password");
    if (!user) throw new ApiError(404, "user not found.");
    if (String(user._id) !== userId)
        throw new ApiError(401, "invalid request!!!");
    try {
        user.isDeleted = true;
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500,
            "something went wrong while deleting user.",
            user
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "user deleted successfully."));
});
