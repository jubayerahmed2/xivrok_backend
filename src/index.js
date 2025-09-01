import "dotenv/config";
import { app } from "./app.js";
import envVariables from "./config/env.js";
import { connectDB } from "./db/index.js";

connectDB()
    .then(() => {
        app.listen(envVariables.PORT || 8000);
    })
    .catch((err) => {
        console.log("DB connection FAILED Err:", err);
    });
