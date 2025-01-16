"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsMiddleware = (req, res, next) => {
    const allowedOrigins = [
        "https://villa-midnight.vercel.app",
        "http://localhost:5173",
        "*",
    ];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    else {
        res.setHeader("Access-Control-Allow-Origin", "null");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.status(204).end();
    }
    else {
        next();
    }
};
exports.default = corsMiddleware;
