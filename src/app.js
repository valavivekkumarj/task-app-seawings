import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";
import { customErrorHandler } from "./middleware/customErrorHandler.js";
import userRouter from "./routers/user.router.js";
import { ApiResponse } from "./utils/ApiResponse.utils.js";
import productRouter from "./routers/product.router.js";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "./logger/logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task API",
            version: "1.0.0",
            description: "API documentation for Task application",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // This indicates the token format is JWT
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Apply bearer authentication globally
            },
        ],
        servers: [
            {
                url: "http://localhost:3000/api/v1", // Update with your server URL
                description: "Development server",
            },
        ],
    },
    apis: [path.join(__dirname, "./routers/*.{ts,js}")], // Path to your route files
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// Swagger setup
app.use("/api/v1/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//morgan logger middleware:
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);
//==================

app.use("/api/v1", userRouter);
app.use("/api/v1/product", productRouter);

app.all("*", async (req, res) => {
    res.status(404).json(new ApiResponse(404, "page not found!!"));
});

//custom error handler:
app.use(customErrorHandler);
export default app;
