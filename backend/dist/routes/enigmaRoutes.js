"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enigmaController_1 = require("../controllers/enigmaController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get("/", enigmaController_1.getAllEnigmas);
router.get("/:id", enigmaController_1.getEnigmaById);
router.post("/", authMiddleware_1.default, enigmaController_1.createEnigma);
router.put("/:id", authMiddleware_1.default, enigmaController_1.updateEnigma);
router.delete("/:id", authMiddleware_1.default, enigmaController_1.deleteEnigma);
exports.default = router;
