import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import enigmaRoutes from "./routes/enigmaRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

const app = express();
const port = process.env.PORT;

const allowedOrigins = ["https://villa-midnight.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/enigmas", enigmaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Domain: ${allowedOrigins[0]}`);
});
