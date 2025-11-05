import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import config from "../config/config.js";

// Protect Routes - verify jwt token
// Adds user Object to request

const protect = async (req, res, next) => {
  let token;

  // check if the token exists in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // req.headers.authorization - "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, config.jwt.secret);

      // Get user from token (Without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "user not found",
        });
      }

      next(); // continue to next middleware/controller
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

export default protect;
