
import UserModel from "../models/user.js";
import { generateToken, clearToken } from "../utils/auth.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "The user already exists" });
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    console.log("generate user id")
    console.log(user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "An error occurred in creating the user" });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    console.log("authenticate")
    console.log(user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "User not found / password incorrect" });
  }
};

const logoutUser = (req, res) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out" });
};

export { registerUser, authenticateUser, logoutUser };