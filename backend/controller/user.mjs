import userSchema from "../model/userDetail.mjs";
import doctorSchema from "../model/DoctorModel.mjs";
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
    user.password = undefined;
    if (!user) {
      return res.status(200).json({
        message: "user not found",
        success: false,
        hit: true,
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
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

//apply doctor controller

export const applyDoctorController = async (req, res, next) => {
  try {
    const newDoctor = await doctorSchema({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userSchema.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userSchema.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).json({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: `Error while applying for doctor`,
    });
  }
};

// notification for applied doctor

export const notificationAppliedDoctor = async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    seennotification.reverse();
    user.notification = [];
    //user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).json({
      success: true,
      message: "all notification marked as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in notification",
      success: false,
      error,
    });
  }
};

//delete all notification --admin

export const deleteAllNotification = async (req, res, next) => {
  try {
    const user = await userSchema.findById({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification deleted successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in deleting all app",
      success: false,
      error,
    });
  }
};
