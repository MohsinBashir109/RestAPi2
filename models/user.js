import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: String,

    gender: String,
  },
  { timestamps: true }
);
//model
export const UserModel = mongoose.model("user", userSchema);
