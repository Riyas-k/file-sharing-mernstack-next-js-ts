import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
const router = express.Router();

let storage = multer.diskStorage({});

let upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Need the file" });
    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "shareMe",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "cloudinary error" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    // console.log(uploadedFile);
    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    res.status(200).json({
        id:file._id,
        Link:`${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sever error" });
  }
});

export default router;
