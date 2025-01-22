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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - fullname
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         username:
 *           type: string
 *           description: User's username
 *         fullname:
 *           type: string
 *           description: User's full name
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: "test@example.com"
 *         username: "testuser"
 *         fullname: "Test User"
 *         password: "strongpassword123"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 */
userRouter.route("/register").post(registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
userRouter.route("/login").post(loginUser);

/**
 * @swagger
 * /update/{userId}:
 *   patch:
 *     summary: Update user account
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
userRouter.route("/update/:userId").patch(authMiddleware, updateAccount);

/**
 * @swagger
 * /delete/{userId}:
 *   delete:
 *     summary: Delete a user account
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRouter.route("/delete/:userId").delete(authMiddleware, deleteUser);

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 */
userRouter.route("/getAll").get(authMiddleware, getAllUser);

/**
 * @swagger
 * /getUser/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 */
userRouter.route("/getUser/:userId").get(authMiddleware, getCurrentUser);

export default userRouter;
