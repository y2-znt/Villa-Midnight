"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getEnigmaByUserId = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const errorHandler_1 = require("../utils/errorHandler");
const getAllUsers = async (req, res) => {
    try {
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
        const user = await (0, userService_1.addUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const user = await (0, userService_1.modifyUser)(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await (0, userService_1.removeUser)(req.params.id);
        res.status(204).json({ message: "User deleted successfully" });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
};
exports.deleteUser = deleteUser;
