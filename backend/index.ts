import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import enigmaRoutes from "./routes/enigmaRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(errorHandler);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/enigmas", enigmaRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
