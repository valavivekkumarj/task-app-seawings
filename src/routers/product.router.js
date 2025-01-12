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

productRouter.route("/create/:userId").post(authMiddleware, createProduct);

productRouter.route("/update/:productId").patch(authMiddleware, updateProduct);

productRouter.route("/delete/:productId").delete(authMiddleware, deleteProduct);

productRouter.route("/getAllList").get(authMiddleware, getAll);

productRouter.route("/getSpecific/:productId").get(authMiddleware, getProduct);

export default productRouter;
