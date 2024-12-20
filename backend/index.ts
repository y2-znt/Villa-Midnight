import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import enigmaRoutes from "./routes/enigmaRoutes";
import userRoutes from "./routes/userRoutes";
import * as bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(errorHandler);
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/enigmas", enigmaRoutes);
app.use("/api/auth", authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export const routes = express.Router();