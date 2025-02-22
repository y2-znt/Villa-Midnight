"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthCallback = exports.googleAuth = exports.logout = exports.getCurrentUser = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../config/config");
const authService_1 = require("../services/authService");
const errorHandler_1 = require("../utils/errorHandler");
const generateToken_1 = require("../utils/generateToken");
const register = async (req, res) => {
    try {
        const { user, token } = await (0, authService_1.registerUser)(req.body);
        res.status(201).json({ message: "User created successfully", user, token });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { user, token } = await (0, authService_1.loginUser)(req.body);
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: No user found"));
        }
        const user = await (0, authService_1.loggedInUser)(req.user.userId);
        res.status(200).json({ message: "User retrieved successfully", user });
    }
    catch (error) {
        console.error("Error retrieving current user:", error);
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getCurrentUser = getCurrentUser;
const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.logout = logout;
exports.googleAuth = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
});
const googleAuthCallback = (req, res) => {
    passport_1.default.authenticate("google", { session: false }, (err, user) => {
        if (err) {
            console.error("❌ Google authentication error:", err);
            return res.redirect(`${config_1.CLIENT_URL}/auth/error?message=${encodeURIComponent(err.message)}`);
        }
        if (!user) {
            return res.redirect(`${config_1.CLIENT_URL}/auth/error?message=${encodeURIComponent("Authentication failed")}`);
        }
        try {
            const token = (0, generateToken_1.generateToken)(user.id);
            res.redirect(`${config_1.CLIENT_URL}/auth/callback?token=${token}`);
        }
        catch (error) {
            console.error("❌ Token generation error:", error);
            res.redirect(`${config_1.CLIENT_URL}/auth/error?message=${encodeURIComponent("Failed to generate authentication token")}`);
        }
    })(req, res);
};
exports.googleAuthCallback = googleAuthCallback;
