import { ApiError } from "../utils/ApiError.utils.js";

import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import Product from "../models/product.model.js";

export const createProduct = asyncHandler(async (req, res) => {
    const createdBy = req.params.userId;
    if (String(req.user._id) !== createdBy)
        throw new ApiError(401, "unauthorized user!!!");
    let { name, description, price, category } = req.body;

    if (!(name && description && price && category)) {
        return res
            .status(400)
            .json(new ApiResponse(400, "some credentials missing."));
    }
    //trim and convert to lowercase:
    name = name.trim().toLowerCase();
    description = description.trim().toLowerCase();
    price = Number(price.trim());
    category = category.trim().toLowerCase();
    //check for empty input
    if ([name, description, category].some((field) => field === "")) {
        return res
            .status(400)
            .json(new ApiResponse(400, "some credentials missing!!!."));
    }

    //create user
    const newProduct = await Product.create({
        name,
        description,
        category,
        createdBy,
        price,
    });
    if (!newProduct) throw new ApiError(500, "failed to create new product");
    res.status(201).json(
        new ApiResponse(201, "new  product created", newProduct)
    );
});

//get All products:

export const getAll = asyncHandler(async (req, res) => {
    const data = await Product.find();
    res.status(201).json(new ApiResponse(201, "All list of  products.", data));
});

//get specific product:

export const getProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "product not found");

    res.status(201).json(
        new ApiResponse(201, "product fetched successfully.", product)
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("createdBy");
    if (String(req.user._id) !== String(product.createdBy._id))
        throw new ApiError(401, "unauthorized user!!!");
    let { name, description, price, category } = req.body;

    //trim and convert to lowercase:
    name = name ? name.trim().toLowerCase() : null;
    description = description ? description.trim().toLowerCase() : null;
    price = price ? Number(price.trim()) : null;
    category = category ? category.trim().toLowerCase() : null;
    //check for empty input
    if (!name && !description && !price && !category) {
        return res
            .status(400)
            .json(new ApiResponse(400, " credentials missing."));
    }

    if (name) {
        product.name = name;
    }
    if (description) {
        user.description = description;
    }
    if (price) {
        user.price = price;
    }
    if (price) {
        user.category = category;
    }
    const updateProduct = await product.save({ validateBeforeSave: false });

    return res
        .status(201)
        .json(
            new ApiResponse(201, "product updated successfully.", updateProduct)
        );
});

//delete specific product:

export const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("createdBy");
    if (!product) throw new ApiError(404, "product not found");
    if (req.user._id !== product.createdBy._id)
        throw new ApiError(401, "unauthorized access.");
    await Product.findByIdAndDelete(productId);
    res.status(201).json(
        new ApiResponse(201, "All list of  products.", product)
    );
});
