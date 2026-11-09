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
// import express from "express";
// import dotenv from "dotenv";
// //dotenv.config();
// const app = express();
// console.log("TERMINAL");

// const PORT = process.env.PORT;
// app.listen(PORT ,() => {
//     console.log(`Server is running at port : ${PORT}`);
// })
// app.get("/" , (req,res)=> {
//     res.send("Hello World");
// })
// app.get("/about" , (req,res)=> {
//     res.send("About Page");
// })




import express from "express";
import { app } from "./app.js";

import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
// console.log("URI:", process.env.MONGODB_URI);
import connectDB from "./db/index.js";
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });




