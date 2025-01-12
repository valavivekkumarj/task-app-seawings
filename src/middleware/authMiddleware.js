import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

export const authMiddleware = async (req, _, next) => {
    try {
        //get access token from cookies or req.header:
        const accessToken =
            req.header("Authorization")?.replace("Bearer ", "") ||
            req.cookies?.accessToken ||
            req.body.accessToken;
        if (!accessToken) throw new ApiError(401, "Unauthorized User");

        //decode accessToken
        const decodeAccessToken = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRETE
        );
        console.log(decodeAccessToken);

        //get user
        const user = await User.findById(decodeAccessToken?._id).select(
            "-password"
        );
        if (!user) throw new ApiError(401, "Invalid request.");
        if (user.isDeleted) {
            throw new ApiError(404, "user is deleted not found.");
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(
            "Error while authorizing user,during verifying user token ",
            err
        );
        next(err);
    }
};
