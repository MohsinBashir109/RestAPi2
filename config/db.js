import mongoose from "mongoose";

//config
const uri = "mongodb://127.0.0.1:27017/local";
export const connected = async () => {
  try {
    const connect = await mongoose
      .connect(uri)
      .then(() => console.log("conected"));

    return connect;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};
