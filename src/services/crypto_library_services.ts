import path from "path";
import { exec } from "child_process";

export class CryptographyLibrary {
  private executablePath: string;

  constructor() {
    this.executablePath = path.resolve(
      __dirname,
      "../../c_library/crypto-executable"
    );
  }

  public encryptFile(
    filePath: string,
    outputFilePath: string,
    encryptionKey: string,
    encrypt: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        `${this.executablePath} ${filePath} ${outputFilePath} ${encryptionKey} ${encrypt}`,
        (error, stdout, stderr) => {
          if (error) {
            return reject(`Encryption Error: ${error.message}`);
          }

          resolve("Encryption Successful");
        }
      );
    });
  }
}
