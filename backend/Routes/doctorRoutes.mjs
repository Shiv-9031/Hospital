import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { getDoctorInfoController } from "../controller/DoctorController.mjs";

const Routes = express.Router();

//get single doctor information
Routes.route("/getDoctorInfo").post(authMiddleware, getDoctorInfoController);

export default Routes;
