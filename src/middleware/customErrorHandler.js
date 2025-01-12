import { ApiResponse } from "../utils/ApiResponse.utils.js";
export const customErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error.";
    const data = err.data || null;
    const errors = err.errors || [];
    const stack = err.stack;

    // Log error for debugging purposes
    console.error(
        `[Error] ${statusCode}: ${message}\nErrors: ${JSON.stringify(
            errors
        )}\nStack: ${err.stack} `
    );

    // Send response as error
    const response = new ApiResponse(statusCode, message, data);
    response.errors = errors;

    // Optionally include stack trace only in development mode
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};
