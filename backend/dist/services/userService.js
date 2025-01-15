"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.modifyUser = exports.addUser = exports.fetchUserEnigmasById = exports.fetchUserById = exports.fetchAllUsers = void 0;
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
const fetchAllUsers = async () => {
    try {
        const users = await prismaClient_1.default.user.findMany();
        return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }
    catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};
exports.fetchAllUsers = fetchAllUsers;
const fetchUserById = async (id) => {
    try {
        const user = await prismaClient_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
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
const addUser = async ({ username, email, password, }) => {
    try {
        const user = await prismaClient_1.default.user.create({
            data: {
                username,
                email,
                password,
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
const modifyUser = async (id, { username, email }) => {
    try {
        const user = await prismaClient_1.default.user.update({
            where: { id },
            data: {
                username,
                email,
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
        await prismaClient_1.default.user.delete({ where: { id } });
    }
    catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};
exports.removeUser = removeUser;
