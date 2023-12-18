import cloudinary from "cloudinary";
import Institution from "../models/institution.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import getDataUri from "../middlewares/dataUri.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, institution_type, phone } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !institution_type || !phone)
    return next(new ErrorHandler("Please enter the required fields", 400));

  let institution = await Institution.findOne({ email });

  if (institution)
    return next(new ErrorHandler("Institution already exist", 409));

  institution = await Institution.create({
    name,
    email,
    password,
    institution_type,
    phone,
  });

  sendToken(res, institution, "Institution succesfully Registered!!", 201);
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

export const addData = catchAsyncError(async (req, res, next) => {
  const { lat, long } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);

  const uploadCloud = await cloudinary.v2.uploader.upload(fileUri);

  const institution = await Institution.findById(req.user.id);

  institution.location = {
    properties: {
      coordinates: [lat, long],
    },
  };

  institution.image = {
    public_id: uploadCloud.public_id,
    url: uploadCloud.url,
  };

  await institution.save();

  res.status(200).json({
    success: true,
    message: "Data added succesfully!!",
  });
});

export const addSeats = catchAsyncError(async (req, res, next) => {
  const { seat_type, seat_available } = req.body;

  if (!seat_type || !seat_available)
    return next(new ErrorHandler("Please enter the required fields", 400));

  const institution = await Institution.findById(req.user.id);

  institution.seats.push({
    seat_type,
    seat_available,
  });

  await institution.save();

  res.status(200).json({
    success: true,
    message: "Seats added succesfully!!",
  });
});
