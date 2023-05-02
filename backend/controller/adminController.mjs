import DoctorSchema from "../model/DoctorModel.mjs";
import UserSchema from "../model/userDetail.mjs";
export const getAllDoctors = async (req, res, next) => {
  try {
    const doctor = await DoctorSchema.find();
    res.status(200).json({
      success: true,
      message: "all doctors list",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "went something wrong",
      error,
    });
  }
};

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await UserSchema.find();

    res.status(200).json({
      success: true,
      data: user,
      message: "all user list",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "something went wrong",
    });
  }
};

// change account status

export const changeAccountStatus = async (req, res, next) => {
  try {
    const { doctorId, status, userId } = req.body;
    const doctor = await DoctorSchema.findByIdAndUpdate(doctorId, { status });
    const user = await UserSchema.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `your doctor account request has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Account status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Error in account status",
      error,
    });
  }
};
