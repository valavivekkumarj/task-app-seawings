import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    createProduct,
    deleteProduct,
    getAll,
    getProduct,
    updateProduct,
} from "../controllers/product.controller.js";
const productRouter = Router({ mergeParams: true });

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Laptop"
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "A high-performance laptop with 16GB RAM."
 *         price:
 *           type: number
 *           description: The price of the product. Must be greater than 0.
 *           example: 999.99
 *         category:
 *           type: string
 *           enum:
 *             - electronics
 *             - fashion
 *             - books
 *             - beauty
 *           description: The category of the product.
 *           example: "electronics"
 *         createdBy:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user who created the product.
 *           example: "64b5f8e2a2b4e63e5cfa62bc"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the product was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the product was last updated.
 */

/**
 * @swagger
 * /create/{userId}:
 *   post:
 *     summary: Create a new product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user creating the product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized.
 */

productRouter.route("/create/:userId").post(authMiddleware, createProduct);


productRouter.route("/update/:productId").patch(authMiddleware, updateProduct);

productRouter.route("/delete/:productId").delete(authMiddleware, deleteProduct);

productRouter.route("/getAllList").get(authMiddleware, getAll);

productRouter.route("/getSpecific/:productId").get(authMiddleware, getProduct);

export default productRouter;
