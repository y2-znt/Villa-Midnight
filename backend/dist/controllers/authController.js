"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const errorHandler_1 = require("../utils/errorHandler");
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
