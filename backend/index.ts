import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import enigmaRoutes from "./routes/enigmaRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(errorMiddleware);
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/enigmas", enigmaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
