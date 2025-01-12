export class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong.",
        data = null,
        errorDetails = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = data;
        this.errors = errorDetails;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
