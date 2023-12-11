
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./error-service.js";

const authenticate = asyncHandler(
  async (req, res, next) => {

    try {
      
      let token = req.cookies.jwt;
      if (!token) {
        throw new AuthenticationError("Token not found");
      }

      const jwtSecret = process.env.JWT_SECRET || "";
      const decoded = jwt.verify(token, jwtSecret);


      if (!decoded || !decoded.id) {
        throw new AuthenticationError("UserId not found");
      }

      const user = await UserModel.findById(decoded.id, "_id name email");

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      req.user = user;
      next();
    } catch (e) {
      console.log(e);
      throw new AuthenticationError("Invalid token");
    }
  }
);

export { authenticate };