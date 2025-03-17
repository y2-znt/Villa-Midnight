"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getEnigmaByUserId = exports.getUserById = exports.getAllUsers = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
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
        const { username, email, password, role } = req.body;
        const user = await (0, userService_1.addUser)({ username, email, password, role });
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
        // Get the current user to check if they have an existing avatar
        const currentUser = await (0, userService_1.fetchUserById)(req.params.id);
        let imageUrl = req.body.avatarUrl;
        if (req.file) {
            // Delete the old image if it exists
            if (currentUser.avatarUrl) {
                try {
                    const publicId = `villa-midnight/${currentUser.avatarUrl.split("/").pop()?.split(".")[0]}`;
                    await cloudinaryConfig_1.default.uploader.destroy(publicId);
                    console.log(`Old user image deleted from Cloudinary: ${publicId}`);
                }
                catch (error) {
                    console.error("Error deleting old image from Cloudinary:", error);
                }
            }
            // Set the new image URL
            imageUrl = req.file.path;
        }
        const user = await (0, userService_1.modifyUser)(req.params.id, {
            ...req.body,
            avatarUrl: imageUrl,
        });
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
        // Fetch the user to get the image URL
        const userToDelete = await (0, userService_1.fetchUserById)(req.params.id);
        // Delete the user
        await (0, userService_1.removeUser)(req.params.id);
        // Delete the user's image from Cloudinary if it exists
        if (userToDelete.avatarUrl) {
            const publicId = `villa-midnight/${userToDelete.avatarUrl.split("/").pop()?.split(".")[0]}`;
            await cloudinaryConfig_1.default.uploader.destroy(publicId);
            console.log(`User image deleted from Cloudinary: ${publicId}`);
        }
        res.status(204).json({ message: "User deleted successfully" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.deleteUser = deleteUser;
