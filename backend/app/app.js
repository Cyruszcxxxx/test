import cors from 'cors';
import express from "express";
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
import module from './models/index.js';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from 'dotenv';


const initialize = (app)=>{
    dotenv.config();
    app.use(cors({
        origin: 'http://localhost:3000', 
        credentials: true, 
      }));

    
    app.use(cookieParser())

    app.use(express.json());
    //app.use(express.urlencoded());
    //app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json()); // To recognize the req obj as a json obj
    app.use(bodyParser.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also

    //mongoose.connect('mongodb+srv://infor6150User:sTYVHPUeWmYy0Y8H@info6150fall2023.x0bvoyg.mongodb.net/userdb?retryWrites=true&w=majority');
    mongoose.connect('mongodb+srv://info6150User:1xdLpaHOkpFGkHQO@info6150.nmhpkfm.mongodb.net/userdb?retryWrites=true&w=majority');
    registerRouter(app);

}

export default initialize;