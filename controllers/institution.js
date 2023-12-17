import Institution from "../models/institution.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, institution_type, location, phone } = req.body;

  if (!name || !email || !password || !institution_type || !location || !phone)
    return next(new ErrorHandler("Please enter the required fields", 400));

  let Institution = await Institution.findOne({ email });

  if (Institution)
    return next(new ErrorHandler("Institution already exist", 409));

  Institution = await Institution.create({
    name,
    email,
    password,
    institution_type,
    location,
    phone,
  });

  sendToken(res, Institution, "Institution succesfully Registered!!", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter the required fields", 400));

  const Institution = await Institution.findOne({ email }).select("+password");
  if (!Institution)
    return next(new ErrorHandler("Invalid Email or Password", 404));

  const isMatch = await Institution.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404));

  sendToken(res, Institution, "Institution Succesfully Logined!!", 201);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Succesfully!!",
    });
});
