"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const authSchema_1 = require("../schemas/authSchema");
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (data) => {
    const { username, email, password, confirmPassword } = authSchema_1.registerSchema.parse(data);
    if (password !== confirmPassword)
        throw new Error("Passwords do not match");
    const existingUser = await prismaClient_1.default.user.findUnique({ where: { email } });
    if (existingUser)
        throw new Error("Email already exists");
    const hashedPassword = await bcrypt_1.default.hash(password, config_1.SALT_ROUNDS);
    const user = await prismaClient_1.default.user.create({
        data: { username, email, password: hashedPassword },
    });
    const token = (0, generateToken_1.generateToken)(user.id);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const { email, password } = authSchema_1.loginSchema.parse(data);
    const user = await prismaClient_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User not found");
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error("Invalid password");
    const token = (0, generateToken_1.generateToken)(user.id);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.loginUser = loginUser;
const loggedInUser = async (userId) => {
    try {
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true, email: true },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching logged-in user:", error);
        throw new Error("An error occurred while retrieving user information");
    }
};
exports.loggedInUser = loggedInUser;
