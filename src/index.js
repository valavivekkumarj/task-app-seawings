import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import logger from "./logger/logger.js";
import { connectionDB } from "./db/connect.db.js";
const port = process.env.PORT;
const startServer = async () => {
    try {
        await connectionDB();
        //start the server
        app.listen(port, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`app running on port : ${port}`);
                logger.info("app running on port : 8000");
            }
        });
    } catch (error) {
        console.error("failed to start server!!!");
    }
};
startServer();
