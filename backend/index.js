import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("uploads", express.static(path.join(__dirname + "uploads")));

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
