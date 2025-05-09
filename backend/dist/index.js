"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config/config");
require("./config/passport");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const enigmaRoutes_1 = __importDefault(require("./routes/enigmaRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: config_1.CLIENT_URL }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(errorMiddleware_1.errorMiddleware);
app.use(bodyParser.json());
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/enigmas", enigmaRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
// Cron job to ping the API every 5 minutes
const sendPing = async () => {
    try {
        const response = await fetch(`${config_1.SERVER_URL}/cron`);
        console.log(`Ping sent: ${response.status} - ${response.statusText}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error sending ping:", error.message);
        }
    }
};
node_cron_1.default.schedule("*/5 * * * *", async () => {
    try {
        console.log("Sending ping...");
        await sendPing();
    }
    catch (error) {
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
