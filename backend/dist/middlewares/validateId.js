"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const validateId = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (!id || typeof id !== 'string') {
            res.status(400).json({ message: `Invalid or missing ${paramName}` });
            return;
        }
        next(); // Continue le traitement
    };
};
exports.validateId = validateId;
