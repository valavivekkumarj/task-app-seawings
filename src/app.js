import express from "express";
import fs from "fs";
import path from "path";
import { DefaultSerializer } from "v8";
import { ApiError } from "./utils/ApiError.utils.js";
import cors from "cors";
import { customErrorHandler } from "./middleware/customErrorHandler.js";
import userRouter from "./routers/user.router.js";
import { ApiResponse } from "./utils/ApiResponse.utils.js";
import productRouter from "./routers/product.router.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1", userRouter);
app.use("/api/v1/product", productRouter);

app.all("*", async (req, res) => {
    res.status(404).json(new ApiResponse(404, "page not found!!"));
});

//custom error handler:
app.use(customErrorHandler);
export default app;
