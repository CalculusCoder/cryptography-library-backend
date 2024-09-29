import { NextFunction, Request, Response } from "express";
const { exec } = require("child_process");
const path = require("path");
import { CryptographyLibrary } from "../services/crypto_library_services";
import { FileService } from "../services/file_services";

export class FileInputController {
  constructor(
    private cryptographyLibrary: CryptographyLibrary,
    private fileService: FileService
  ) {
    this.cryptographyLibrary = cryptographyLibrary;
    this.fileService = fileService;
  }

  public async handleFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { encryptionKey, encrypt, cipher } = req.body;

      const fileName = req.file?.filename;

      if (!fileName) {
        res.status(400).send("File is required");
        return;
      }

      if (!encryptionKey || typeof encrypt === "undefined") {
        res.status(400).send("Encryption key and encrypt flag are required");
        return;
      }

      const filePath = this.fileService.getFilePath(fileName);
      const outputFilePath = this.fileService.getOutputFilePath(encrypt);

      await this.cryptographyLibrary.encryptFile(
        filePath,
        outputFilePath,
        encryptionKey,
        encrypt,
        cipher
      );

      this.fileService.deleteFile(filePath);

      res.setHeader("X-Encrypt-Status", encrypt);

      res.sendFile(outputFilePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Failed to send the file.");
        }

        this.fileService.deleteFile(outputFilePath);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing file");
    }
  }
}
