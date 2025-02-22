"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnigma = exports.updateEnigma = exports.createEnigma = exports.getEnigmaById = exports.getAllEnigmas = void 0;
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
        const enigma = await (0, enigmaService_1.addEnigma)({
            ...req.body,
            userId: req.user.userId,
        });
        res.status(201).json(enigma);
    }
    catch (error) {
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
        const enigma = await (0, enigmaService_1.modifyEnigma)(req.params.id, {
            ...req.body,
            userId: existingEnigma.userId,
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
        await (0, enigmaService_1.removeEnigma)(req.params.id);
        res.status(204).json({ message: "Enigma deleted successfully" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.deleteEnigma = deleteEnigma;
