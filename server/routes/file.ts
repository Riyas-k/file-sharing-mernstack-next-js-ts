import express from "express";
import multer from "multer";
const router = express.Router();

let storage = multer.diskStorage({});

let upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Need the file" });
    console.log(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sever error" });
  }
});

export default router;
