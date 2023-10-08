import mongoose from "mongoose";

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log(error);
  }
  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("connect to db");
    return;
  }
  connection.on("error", () => {
    console.log("connection failed");
  });
};
export default connectDB;
