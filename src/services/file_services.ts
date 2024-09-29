import path from "path";
import { unlink } from "fs";

export class FileService {
  public getFilePath(fileName: string | undefined): string {
    if (fileName) {
      return path.resolve(__dirname, `../../uploads/${fileName}`);
    }

    return "NULL";
  }

  public getOutputFilePath(encrypt: string): string {
    if (encrypt.toLowerCase() === "true") {
      return path.resolve(__dirname, "../../c_library/encrypted.txt");
    }

    return path.resolve(__dirname, "../../c_library/decrypted.txt");
  }

  public deleteFile(filePath: string): void {
    unlink(filePath, (err) => {
      if (err) console.error(err);
    });
  }
}
