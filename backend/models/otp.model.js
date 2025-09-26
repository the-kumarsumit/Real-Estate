import mongoose from "mongoose"

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);