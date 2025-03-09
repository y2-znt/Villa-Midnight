import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import { CLIENT_URL, SERVER_URL } from "./config/config";
import "./config/passport";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import enigmaRoutes from "./routes/enigmaRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT;

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(passport.initialize());
app.use(errorMiddleware);
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/enigmas", enigmaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Cron job to ping the API every 5 minutes
const sendPing = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/cron`);
    console.log(`Ping sent: ${response.status} - ${response.statusText}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending ping:", error.message);
    }
  }
};

cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("Sending ping...");
    await sendPing();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending ping:", error.message);
    }
  }
});

app.get("/cron", (req, res) => {
  res.status(200).send("Pong");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
