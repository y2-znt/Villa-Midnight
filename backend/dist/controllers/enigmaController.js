"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnigma = exports.updateEnigma = exports.createEnigma = exports.getEnigmaById = exports.getAllEnigmas = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const enigmaService_1 = require("../services/enigmaService");
const errorHandler_1 = require("../utils/errorHandler");
const getAllEnigmas = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "ADMIN") {
            res.status(403).json({
                message: "Access forbidden: Admin access required",
            });
            return;
        }
        const enigmas = await (0, enigmaService_1.fetchAllEnigmas)();
        res.status(200).json(enigmas);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getAllEnigmas = getAllEnigmas;
const getEnigmaById = async (req, res) => {
    try {
        if (!req.user) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: No user found"));
        }
        const enigma = await (0, enigmaService_1.fetchEnigmaById)(req.params.id);
        if (req.user.role !== "ADMIN" && enigma.userId !== req.user.userId) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: You can only access your own enigmas"));
        }
        res.status(200).json(enigma);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.getEnigmaById = getEnigmaById;
const createEnigma = async (req, res) => {
    try {
        if (!req.user) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: No user found"));
        }
        // Convert string values to numbers (for postman)
        const enigmaData = {
            ...req.body,
            numberOfParticipants: parseInt(req.body.numberOfParticipants, 10),
            numberOfHours: parseInt(req.body.numberOfHours, 10),
            userId: req.user.userId,
        };
        if (!req.file) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("No image file provided"));
        }
        // Multer-storage-cloudinary already uploaded the file
        const imageUrl = req.file.path;
        const enigma = await (0, enigmaService_1.addEnigma)({
            ...enigmaData,
            image: imageUrl,
        });
        res.status(201).json(enigma);
    }
    catch (error) {
        console.error("Error creating enigma:", error);
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.createEnigma = createEnigma;
const updateEnigma = async (req, res) => {
    try {
        if (!req.user) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: No user found"));
        }
        const existingEnigma = await (0, enigmaService_1.fetchEnigmaById)(req.params.id);
        if (req.user.role !== "ADMIN" &&
            existingEnigma.userId !== req.user.userId) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: You can only update your own enigmas"));
        }
        // Convert string values to numbers (for postman)
        const enigmaData = {
            ...req.body,
            numberOfParticipants: parseInt(req.body.numberOfParticipants, 10),
            numberOfHours: parseInt(req.body.numberOfHours, 10),
            userId: existingEnigma.userId,
        };
        let imageUrl = existingEnigma.image;
        // If a new image is provided
        if (req.file) {
            // Delete the old image if it exists
            if (existingEnigma.image) {
                try {
                    const publicId = `villa-midnight/${existingEnigma.image.split("/").pop()?.split(".")[0]}`;
                    await cloudinaryConfig_1.default.uploader.destroy(publicId);
                    console.log(`Old image deleted from Cloudinary: ${publicId}`);
                }
                catch (error) {
                    console.error("Error deleting old image from Cloudinary:", error);
                }
            }
            // Use the URL provided by multer-storage-cloudinary directly
            imageUrl = req.file.path;
        }
        const enigma = await (0, enigmaService_1.modifyEnigma)(req.params.id, {
            ...enigmaData,
            image: imageUrl,
        });
        res.status(200).json(enigma);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.updateEnigma = updateEnigma;
const deleteEnigma = async (req, res) => {
    try {
        if (!req.user) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: No user found"));
        }
        const existingEnigma = await (0, enigmaService_1.fetchEnigmaById)(req.params.id);
        if (req.user.role !== "ADMIN" &&
            existingEnigma.userId !== req.user.userId) {
            return (0, errorHandler_1.handleErrorResponse)(res, new Error("Unauthorized: You can only delete your own enigmas"));
        }
        // Delete the image from Cloudinary
        if (existingEnigma.image) {
            try {
                const publicId = `villa-midnight/${existingEnigma.image.split("/").pop()?.split(".")[0]}`;
                await cloudinaryConfig_1.default.uploader.destroy(publicId);
                console.log(`Image deleted successfully: ${publicId}`);
            }
            catch (error) {
                console.error("Error deleting image from Cloudinary:", error);
            }
        }
        await (0, enigmaService_1.removeEnigma)(req.params.id);
        res.status(204).json({ message: "Enigma deleted successfully" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.deleteEnigma = deleteEnigma;
