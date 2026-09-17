// import mongosse from "mongoose";

// import express from "express";



// const app = express();

// (
// async () => {
//   try {
//     await mongosse.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }
// )()


import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
// console.log("URI:", process.env.MONGODB_URI);
import connectDB from "./db/index.js";
connectDB();

