import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institution_type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  seat_available: {
    type: Number,
    required: true,
  },
  seat_type: [
    {
      seat_type: {
        type: String,
        required: true,
      },
      seat_available: {
        type: Number,
        required: true,
      },
      seat_price: {
        type: Number,
        required: true,
      },
    },
  ],
  reservation: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      seat_type: {
        type: String,
        required: true,
      },
      seat_price: {
        type: Number,
        required: true,
      },
      seat_number: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

export default mongoose.model("institution", institutionSchema);
