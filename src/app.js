import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();

// app.use(cors());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({extended: true, limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// importing router
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);
export {app};