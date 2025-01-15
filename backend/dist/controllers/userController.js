"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getEnigmaByUserId = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, userService_1.fetchAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await (0, userService_1.fetchUserById)(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const getEnigmaByUserId = async (req, res) => {
    try {
        const enigmas = await (0, userService_1.fetchUserEnigmasById)(req.params.id);
        res.status(200).json(enigmas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEnigmaByUserId = getEnigmaByUserId;
const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await (0, userService_1.addUser)({ username, email, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await (0, userService_1.modifyUser)(req.params.id, {
            username,
            email,
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await (0, userService_1.removeUser)(req.params.id);
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
