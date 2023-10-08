import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import fileRouter from "./routes/file";
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/file", fileRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
