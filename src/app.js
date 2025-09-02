import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// import routes
import aiRouter from "./routes/ai.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/ais", aiRouter);

export { app };
