import express from "express";
import {
  loginController,
  registerController,
  authController,
} from "../controller/user.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

//router object

const router = express.Router();

//route for login
router.route("/login").post(loginController);

//route for register
router.route("/register").post(registerController);

// Auth for post

router.route("/getUserData").post(authMiddleware, authController); //

export default router;
