import DoctorSchema from "../model/DoctorModel.mjs";
export const getDoctorInfoController = async (req, res, next) => {
  try {
    const Doctor = await DoctorSchema.findOne({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      message: "doctor data fetch success",
      data: Doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: `Error in Fetching Doctor Details`,
    });
  }
};
