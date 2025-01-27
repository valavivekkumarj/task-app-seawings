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
 * /product/create/{userId}:
 *   post:
 *     summary: Create a new product.
 *     tags:
 *       - Product
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

/**
 *
 *
 * @swagger
 * /product/update/{productId}:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Update an existing product by its ID
 *     description: Allows updating an existing product using its unique product ID. Provide the product details in the request body to modify the product.
 *     operationId: updateProduct
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product.
 *     requestBody:
 *       description: Product object that needs to be updated.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *       required: true
 *     responses:
 *       '200':
 *         description: Product successfully updated
 *       '400':
 *         description: Bad request. Invalid or missing input data.
 *       '404':
 *         description: Product not found with the given ID.
 *       '401':
 *         description: Unauthorized access. Invalid or missing credentials.
 */

productRouter.route("/update/:productId").patch(authMiddleware, updateProduct);

/**
 * @swagger
 * /product/delete/{productId}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete product
 *     description: Delete an existing product by its unique product ID.
 *     operationId: deleteProduct
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to be deleted.
 *     responses:
 *       '200':
 *         description: Product successfully deleted
 *       '404':
 *         description: Product not found with the given ID.
 *       '401':
 *         description: Unauthorized access. Invalid or missing credentials.
 */

productRouter.route("/delete/:productId").delete(authMiddleware, deleteProduct);

/**
 * @swagger
 * /product/getAllList:
 *   get:
 *     tags:
 *       - Product
 *     summary: get all product
 *     description: get all the product list.
 *     operationId: getAllProduct
 *     responses:
 *       '200':
 *         description: Products successfully fetched.
 *       '404':
 *         description: Products not found.
 *       '401':
 *         description: Unauthorized access. Invalid or missing credentials.
 */
productRouter.route("/getAllList").get(authMiddleware, getAll);

/**
 * @swagger
 * /product/getAllList:
 *   get:
 *     tags:
 *       - Product
 *     summary: get product with its id.
 *     description: get the product by its id.
 *     operationId: getSpecific Product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to be fetched.
 *     responses:
 *       '200':
 *         description: Product successfully fetched.
 *       '404':
 *         description: Product not found.
 *       '401':
 *         description: Unauthorized access. Invalid or missing credentials.
 */
productRouter.route("/getSpecific/:productId").get(authMiddleware, getProduct);

export default productRouter;
