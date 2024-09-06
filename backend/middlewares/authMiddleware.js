import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { asyncHandler } from "./asyncHandler";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = jwt.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorize token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorize no token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorize as Admin");
  }
};

export default { authenticate, authorizeAdmin };
