"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getEnigmaByUserId = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const errorHandler_1 = require("../utils/errorHandler");
const getAllUsers = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "ADMIN") {
            res.status(403).json({
                message: "Access forbidden: Admin access required",
            });
            return;
        }
        const users = await (0, userService_1.fetchAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
            res.status(403).json({
                message: "Access forbidden: You can only access your own data",
            });
            return;
        }
        const user = await (0, userService_1.fetchUserById)(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getUserById = getUserById;
const getEnigmaByUserId = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
            res.status(403).json({
                message: "Access forbidden: You can only access your own enigmas",
            });
            return;
        }
        const enigmas = await (0, userService_1.fetchUserEnigmasById)(req.params.id);
        res.status(200).json(enigmas);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getEnigmaByUserId = getEnigmaByUserId;
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await (0, userService_1.addUser)({ username, email, password });
        res.status(201).json(user);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
            res.status(403).json({
                message: "Access forbidden: You can only modify your own data",
            });
            return;
        }
        const { username, email } = req.body;
        const user = await (0, userService_1.modifyUser)(req.params.id, { username, email });
        res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
            res.status(403).json({
                message: "Access forbidden: You can only delete your own account",
            });
            return;
        }
        await (0, userService_1.removeUser)(req.params.id);
        res.status(204).json({ message: "User deleted successfully" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.deleteUser = deleteUser;
