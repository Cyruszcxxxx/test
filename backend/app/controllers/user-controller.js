import UserModel from '../models/user.js';
import * as userService from '../services/user-service.js';
import {setResponse,setErrorResponse} from './response-handler.js';
import {request, response} from "express";
import asyncHandler from "express-async-handler";

export const find=async (request, response)=>{
    try{
       const params = {...request.query};
       const users = await userService.search(params);
        setResponse(users,response);
    }catch (err){
        setErrorResponse(err,response);
    }
}
export const post =async (request, response)=>{
    try{
        const newUser={...request.body};
        const user=await userService.save(newUser);
        setResponse(user,response);


    }catch (err){
        setErrorResponse(err,response);

    }
}

export const get =async (request, response)=>{
    try{
        const id = request.params.id;
        const user=await userService.findById(id);
        setResponse(user,response);


    }catch (err){
        setErrorResponse(err,response);

    }
}

export const put =async (request, response)=>{
    try{
        const id = request.params.id;
        const updatedUser={...request.body};
        const user=await userService.update(updatedUser,id);
        setResponse(user,response);


    }catch (err){
        setErrorResponse(err,response);

    }
}

export const remove =async (request, response)=>{
    try{
        const id = request.params.id;
        const user=await userService.remove(id);
        setResponse({},response);


    }catch (err){
        setErrorResponse(err,response);

    }
}
