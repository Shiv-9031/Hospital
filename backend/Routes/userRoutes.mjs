import express from "express";
import {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  notificationAppliedDoctor,
  deleteAllNotification,
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

//Apply Doctor ||Post
router.route("/apply-doctor").post(authMiddleware, applyDoctorController);

//Notification Doctor || Post
router
  .route("/get-all-notification")
  .post(authMiddleware, notificationAppliedDoctor);

//delete notification doctor admin || Post

router
  .route("/delete-all-notification")
  .post(authMiddleware, deleteAllNotification);

export default router;
