import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import fileRouter from "./routes/file";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const app = express();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_API_CLOUD,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/file", fileRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
