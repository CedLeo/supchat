//executed before controller

import User from "../models/User.js";
import jwt from "jsonwebtoken";

//middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;

    //decode user token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find userid and remove the password from the user data
    const user = await User.findById(decoded.userId).select("-password");

    // check if user is available and return a response
    if (!user) return res.json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
