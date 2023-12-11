import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  const token = jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: "24h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearToken };