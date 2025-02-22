"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Public route
router.post("/", userController_1.createUser);
// Private routes
router.get("/", authMiddleware_1.default, userController_1.getAllUsers);
router.get("/:id", authMiddleware_1.default, userController_1.getUserById);
router.get("/:id/enigmas", authMiddleware_1.default, userController_1.getEnigmaByUserId);
router.put("/:id", authMiddleware_1.default, userController_1.updateUser);
router.delete("/:id", authMiddleware_1.default, userController_1.deleteUser);
exports.default = router;
