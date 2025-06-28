import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";
// const express = require("express");  // type: common js
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/reateLimiter.js";
import path from "path";



dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001
// const MONGO_URL = process.env.MONGO_URL;
const __dirname = path.resolve()

// middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors())
}
app.use(express.json()); // this middleware parses json body. req.body

app.use(rateLimiter)

// // simple middleware.
// app.use((req, res, next) => {
    //     console.log(`req method is ${req.method} and req URL is ${req.url}`);
    //     next();
    // })
    
    
    
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });

}


    
    // console.log("PORT is this  ---- :",PORT);
connectDB().then( () =>{

    app.listen(PORT, () =>{
        console.log("Server started on port : ", PORT);
    })
    
})
//