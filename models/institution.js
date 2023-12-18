import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institution_type: {
    type: String,
    required: true,
  },
  image: {
    public_id: String,
    url: String,
  },
  location: {
    type: Object,
    properties: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: Array,
        items: {
          type: Number,
          minItems: 2,
          maxItems: 2,
        },
      },
    },
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  total_seat_available: {
    type: Number,
    default: 0,
  },
  seats: [
    {
      seat_type: {
        type: String,
        required: true,
      },
      seat_available: {
        type: Number,
        required: true,
      },
    },
  ],
});

institutionSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

institutionSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Institution', institutionSchema);
