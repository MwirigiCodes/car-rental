import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});
