"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const authService_1 = require("../services/authService");
const authCookie_1 = require("../utils/authCookie");
const handleErrorResponse = (res, error) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    else {
        res.status(400).json({ message: error.message });
    }
};
const register = async (req, res) => {
    try {
        const { user, token } = await (0, authService_1.registerUser)(req.body);
        (0, authCookie_1.setAuthCookie)(res, token);
        console.log("register token", token);
        res.status(201).json({ message: "User created successfully", user, token });
    }
    catch (error) {
        handleErrorResponse(res, error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { user, token } = await (0, authService_1.loginUser)(req.body);
        (0, authCookie_1.setAuthCookie)(res, token);
        console.log("login token", token);
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (error) {
        handleErrorResponse(res, error);
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        const user = await (0, authService_1.loggedInUser)(req.user.userId);
        res.status(200).json({ message: "User retrieved successfully", user });
    }
    catch (error) {
        console.error("Error retrieving current user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCurrentUser = getCurrentUser;
const logout = async (req, res) => {
    try {
        (0, authCookie_1.clearAuthCookie)(res);
        console.log("logout token cleared", req.cookies.authToken);
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred during logout" });
    }
};
exports.logout = logout;
