import express from "express";
import {
    registerUser,
    loginUser,
    updateAccount,
    getCurrentUser,
    deleteUser,
    getAllUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const userRouter = express.Router({ mergeParams: true });

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/update/:userId").patch(authMiddleware, updateAccount);

userRouter.route("/delete/:userId").delete(authMiddleware, deleteUser);

userRouter.route("/getAll").get(authMiddleware, getAllUser);
userRouter.route("/getUser/:userId").get(authMiddleware, getCurrentUser);

export default userRouter;
