"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Public routes
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
// Private routes
router.get("/current-user", authMiddleware_1.default, authController_1.getCurrentUser);
router.post("/logout", authMiddleware_1.default, authController_1.logout);
// Google OAuth routes
router.get("/google", authController_1.googleAuth);
router.get("/google/callback", authController_1.googleAuthCallback);
exports.default = router;
