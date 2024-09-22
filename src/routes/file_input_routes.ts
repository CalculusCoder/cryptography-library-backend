import express from "express";
import { FileInputController } from "../controllers.ts/file_input_controller";
const router = express.Router();
import multer from "multer";
import { CryptographyLibrary } from "../services/crypto_library_services";
import { FileService } from "../services/file_services";

//memory storage runs out fast with large files or multiple small files
// const upload = multer({ storage: multer.memoryStorage() });

const upload = multer({ dest: `uploads/` });

const cryptographyLibrary = new CryptographyLibrary();
const fileService = new FileService();
const fileInputController = new FileInputController(
  cryptographyLibrary,
  fileService
);

router.post("/upload", upload.single("file"), (req, res, next) =>
  fileInputController.handleFile(req, res, next)
);

export default router;
