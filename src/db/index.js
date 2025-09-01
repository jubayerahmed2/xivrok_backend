import mongoose from "mongoose";
import envVariables from "../config/env.js";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        // DB alway in another continent
        const databaseInstance = await mongoose.connect(
            `${envVariables.MONGO_URI}/${DB_NAME}`
        );

        console.log(
            `DB connected!! DB host: ${databaseInstance.connection.host}`
        );
    } catch (error) {
        console.log(`Database connection FAILED! Error: \n ${error}`);
        process.exit(1);
    }
};

export { connectDB };
