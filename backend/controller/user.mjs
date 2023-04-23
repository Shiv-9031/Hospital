import userSchema from "../model/userDetail.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//login
export const loginController = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        message: "user not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .json({ message: "Invalid email or Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "login successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `login controller ${error.message}`,
    });
  }
};
//Register
export const registerController = async (req, res, next) => {
  try {
    const existingingUser = await userSchema.findOne({ email: req.body.email });

    if (existingingUser) {
      return res.status(200).json({
        message: "user already exist",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userSchema(req.body);
    await newUser.save();
    res.status(201).json({
      message: "successfully registered",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `register controller ${error.message}`,
    });
  }
};

export const authController = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).json({
        message: "user not found",
        success: false,
        hit: true,
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error,
    });
  }
};
