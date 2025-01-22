import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Hadiya Task API",
            version: "1.0.0",
            description: "API documentation for Hadiya Task application",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1", // Update with your server URL
                description: "Development server",
            },
        ],
    },
    apis: [path.join(__dirname, "../routers/*.js")], // Path to your route files
};
