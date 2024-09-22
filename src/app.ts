import express from "express";
import greetRoutes from "./routes/file_input_routes";
const { exec } = require("child_process");
import multer from "multer";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    exposedHeaders: ["X-Encrypt-Status"],
  })
);

app.use(greetRoutes);

app.listen(5000, () => {
  console.log("Application started on port 5000!");
});
