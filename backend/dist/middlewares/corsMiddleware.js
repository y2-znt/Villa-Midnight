"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsMiddleware = (req, res, next) => {
    const allowedOrigins = [
        "http://localhost:5173",
        "https://villa-midnight.vercel.app",
    ];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
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
