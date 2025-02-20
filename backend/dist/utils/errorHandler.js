"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
const zod_1 = require("zod");
const handleErrorResponse = (res, error) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(422).json({ message: "Validation error", errors: error.errors });
    }
    else if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
    }
    else if (error.message.includes("unauthorized") ||
        error.message.includes("forbidden")) {
        res.status(403).json({ message: error.message });
    }
    else {
        res.status(400).json({ message: error.message });
    }
};
exports.handleErrorResponse = handleErrorResponse;
