"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enigmaSchema = void 0;
const zod_1 = require("zod");
exports.enigmaSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    difficulty: zod_1.z.number().min(1, "Difficulty must be at least 1"),
    image: zod_1.z.string().url("Image must be a valid URL"),
    userId: zod_1.z.string().min(1, "User ID is required"),
    numberOfParticipants: zod_1.z
        .number()
        .min(2, "Number of participants must be at least 2"),
    numberOfHours: zod_1.z.number().min(1, "Number of hours must be at least 1"),
});
