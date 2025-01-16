"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnigma = exports.updateEnigma = exports.createEnigma = exports.getEnigmaById = exports.getAllEnigmas = void 0;
const enigmaService_1 = require("../services/enigmaService");
const getAllEnigmas = async (req, res) => {
    try {
        const enigmas = await (0, enigmaService_1.fetchAllEnigmas)();
        res.status(200).json(enigmas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllEnigmas = getAllEnigmas;
const getEnigmaById = async (req, res) => {
    try {
        const enigma = await (0, enigmaService_1.fetchEnigmaById)(req.params.id);
        res.status(200).json(enigma);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEnigmaById = getEnigmaById;
const createEnigma = async (req, res) => {
    const { userId, title, description, image, difficulty, numberOfParticipants, numberOfHours, } = req.body;
    try {
        const enigma = await (0, enigmaService_1.addEnigma)({
            userId,
            title,
            description,
            image,
            difficulty,
            numberOfParticipants,
            numberOfHours,
        });
        res.status(201).json(enigma);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createEnigma = createEnigma;
const updateEnigma = async (req, res) => {
    const { userId, title, description, image, difficulty, numberOfParticipants, numberOfHours, } = req.body;
    try {
        const enigma = await (0, enigmaService_1.modifyEnigma)(req.params.id, {
            userId,
            title,
            description,
            image,
            difficulty,
            numberOfParticipants,
            numberOfHours,
        });
        res.status(200).json(enigma);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateEnigma = updateEnigma;
const deleteEnigma = async (req, res) => {
    try {
        const message = await (0, enigmaService_1.removeEnigma)(req.params.id);
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteEnigma = deleteEnigma;
