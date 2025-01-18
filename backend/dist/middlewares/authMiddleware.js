"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, email: true },
        });
        if (!user) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        req.user = { userId: user.id };
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
exports.default = authMiddleware;
