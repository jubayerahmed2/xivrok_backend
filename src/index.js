import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
    .then(() => {
        app.listen(8000);
    })
    .catch((err) => {
        console.log("DB connection FAILED Err:", err);
    });
