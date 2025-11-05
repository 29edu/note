import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create user (password will be hashed automatically by the pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // send response
    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: {
        id: user._id, // This is automaically assigned by mongoose even without creating
        name: user.name,
        email: user.email,
        token: token,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. The email is not found in database",
      });
    }

    // check Password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Password didn't match",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select("-password"); // This is used to exclude selection of password (select(-password))

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, getUserProfile };
