import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user
    next()
  } catch (error) {
    console.log('Error in protectRoute middleware: ' + error.message)
    res.status(500).json({message: 'Internal server error'})
  }
};
