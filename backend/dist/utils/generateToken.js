"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET, {
        expiresIn: config_1.TOKEN_EXPIRY,
    });
};
exports.generateToken = generateToken;
