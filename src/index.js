import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
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
            }
        });
    } catch (error) {
        console.error("failed to start server!!!");
    }
};
startServer();
