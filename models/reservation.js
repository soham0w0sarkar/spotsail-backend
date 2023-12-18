import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  institution_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Institution",
    required: true,
  },
  seat_type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
});

export default mongoose.model("Reservation", reservationSchema);
