import { instance } from "../server.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Institution from "../models/institution.js";
import User from "../models/user.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role)
    return next(new ErrorHandler("Please enter the required fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exist", 409));

  user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  sendToken(res, user, "User succesfully Registered!!", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter the required fields", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!User) return next(new ErrorHandler("Invalid Email or Password", 404));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404));

  sendToken(res, user, "User Succesfully Logined!!", 201);
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

export const nearByInstitution = catchAsyncError(async (req, res, next) => {
  const { lat, lng } = req.query;

  if (!lat || !lng)
    return next(new ErrorHandler("Please enter the required fields", 400));

  const radius = 100;

  const nearByInstitution = await Institution.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radius,
      },
    },
  });

  res.status(200).json({
    success: true,
    nearByInstitution,
  });
});

export const reservation = catchAsyncError(async (req, res, next) => {
  const { institution_email, seat_type } = req.body;

  if (!institution_email || !seat_type)
    return next(new ErrorHandler("Please enter the required fields", 400));

  const institution = await Institution.find({ email: institution_email });

  const reservation = await Reservation.create({
    user_id: req.user.id,
    institution_id: institution._id,
    seat_type,
    time: new Date().toLocaleTimeString(),
  });

  await reservation.save();

  res.status(200).json({
    success: true,
    message: "Reservation Succesfully!!",
  });
});

export const myReservation = catchAsyncError(async (req, res, next) => {
  const reservation = await Reservation.find({ user_id: req.user.id });

  res.status(200).json({
    success: true,
    reservation,
  });
});

// export const payment = catchAsyncError(async (req, res, next) => {
//   await instance.qrCode.create({
//     type: "upi_qr",
//     name: "Store Front Display",
//     usage: "single_use",
//     fixed_amount: true,
//     payment_amount: 300,
//     description: "For Store 1",
//     customer_id: "cust_HKsR5se84c5LTO",
//     close_by: 1681615838,
//     notes: {
//       purpose: "Test UPI QR Code notes",
//     },
//   });
// });
