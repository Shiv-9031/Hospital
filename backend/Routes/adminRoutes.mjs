import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import {
  getAllDoctors,
  getAllUsers,
  changeAccountStatus,
} from "../controller/adminController.mjs";

const Routes = express.Router();

// get all user method
Routes.route("/getAllUsers").get(authMiddleware, getAllUsers);

//get all doctors method
Routes.route("/getAllDoctors").get(authMiddleware, getAllDoctors);

// Post account status
Routes.route("/changeAccountStatus").post(authMiddleware, changeAccountStatus);

export default Routes;
