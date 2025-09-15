import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRoutes from './routes/paymentRoute.js';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true 
}));

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
