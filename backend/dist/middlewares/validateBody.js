"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !(field in req.body));
        if (missingFields.length > 0) {
            res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
            return;
        }
        next(); // Continue le traitement
    };
};
exports.validateBody = validateBody;
