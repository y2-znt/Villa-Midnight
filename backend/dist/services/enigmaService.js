"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEnigma = exports.modifyEnigma = exports.addEnigma = exports.fetchEnigmaById = exports.fetchAllEnigmas = void 0;
const enigmaSchema_1 = require("../schemas/enigmaSchema");
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
// Fetch all enigmas
const fetchAllEnigmas = async () => {
    try {
        const enigmas = await prismaClient_1.default.enigma.findMany();
        return enigmas;
    }
    catch (error) {
        throw new Error(`Failed to fetch enigmas: ${error.message}`);
    }
};
exports.fetchAllEnigmas = fetchAllEnigmas;
const fetchEnigmaById = async (id) => {
    try {
        if (!id || typeof id !== "string") {
            throw new Error("Invalid or missing ID parameter");
        }
        const enigma = await prismaClient_1.default.enigma.findUnique({ where: { id } });
        if (!enigma) {
            throw new Error("Enigma not found");
        }
        return enigma;
    }
    catch (error) {
        throw new Error(`Failed to fetch enigma: ${error.message}`);
    }
};
exports.fetchEnigmaById = fetchEnigmaById;
const addEnigma = async (data) => {
    const { userId, title, description, image, difficulty, numberOfParticipants, numberOfHours, } = enigmaSchema_1.enigmaSchema.parse(data);
    try {
        const userExists = await prismaClient_1.default.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new Error("User not found");
        }
        const enigma = await prismaClient_1.default.enigma.create({
            data: {
                title,
                description,
                difficulty,
                image,
                user: {
                    connect: { id: userId },
                },
                numberOfParticipants,
                numberOfHours,
            },
        });
        return enigma;
    }
    catch (error) {
        throw new Error(`Failed to create enigma: ${error.message}`);
    }
};
exports.addEnigma = addEnigma;
const modifyEnigma = async (id, data) => {
    const { userId, title, description, image, difficulty, numberOfParticipants, numberOfHours, } = enigmaSchema_1.enigmaSchema.parse(data);
    try {
        const enigma = await prismaClient_1.default.enigma.update({
            where: { id },
            data: {
                userId,
                title,
                description,
                difficulty,
                image,
                numberOfParticipants,
                numberOfHours,
            },
        });
        return enigma;
    }
    catch (error) {
        throw new Error(`Failed to update enigma: ${error.message}`);
    }
};
exports.modifyEnigma = modifyEnigma;
const removeEnigma = async (id) => {
    try {
        await prismaClient_1.default.enigma.delete({ where: { id } });
        return { message: "Enigma deleted" };
    }
    catch (error) {
        throw new Error(`Failed to delete enigma: ${error.message}`);
    }
};
exports.removeEnigma = removeEnigma;
