"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.modifyUser = exports.addUser = exports.fetchUserEnigmasById = exports.fetchUserById = exports.fetchAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
const fetchAllUsers = async () => {
    try {
        const users = await prismaClient_1.default.user.findMany({
            include: { enigmas: true },
        });
        return users.map(({ password, enigmas, ...userWithoutPassword }) => ({
            ...userWithoutPassword,
            enigmas,
        }));
    }
    catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};
exports.fetchAllUsers = fetchAllUsers;
const fetchUserById = async (id) => {
    try {
        const user = await prismaClient_1.default.user.findUnique({
            where: { id },
            include: { enigmas: true },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            enigmas: user.enigmas,
        };
    }
    catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};
exports.fetchUserById = fetchUserById;
const fetchUserEnigmasById = async (userId) => {
    try {
        const enigmas = await prismaClient_1.default.enigma.findMany({ where: { userId } });
        if (!enigmas) {
            throw new Error("Enigmas not found");
        }
        return enigmas;
    }
    catch (error) {
        throw new Error(`Failed to fetch enigmas: ${error.message}`);
    }
};
exports.fetchUserEnigmasById = fetchUserEnigmasById;
const addUser = async ({ username, email, password, role, }) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, config_1.SALT_ROUNDS);
        const user = await prismaClient_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
};
exports.addUser = addUser;
const modifyUser = async (id, { username, email, avatarUrl, role, }) => {
    try {
        const user = await prismaClient_1.default.user.update({
            where: { id },
            data: {
                username,
                email,
                avatarUrl,
                role,
            },
        });
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};
exports.modifyUser = modifyUser;
const removeUser = async (id) => {
    try {
        await prismaClient_1.default.enigma.deleteMany({ where: { userId: id } });
        await prismaClient_1.default.user.delete({ where: { id } });
    }
    catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};
exports.removeUser = removeUser;
