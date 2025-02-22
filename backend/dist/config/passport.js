"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prismaClient_1 = __importDefault(require("../src/prisma/prismaClient"));
const config_1 = require("./config");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.GOOGLE_CLIENT_ID,
    clientSecret: config_1.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("Email not provided by Google"));
        }
        const existingUser = await prismaClient_1.default.user.findFirst({
            where: {
                OR: [{ googleId: profile.id }, { email }],
            },
        });
        if (existingUser) {
            // Update Google ID if not set
            if (!existingUser.googleId) {
                await prismaClient_1.default.user.update({
                    where: { id: existingUser.id },
                    data: { googleId: profile.id },
                });
            }
            return done(null, { ...existingUser, userId: existingUser.id });
        }
        // Create new user
        const newUser = await prismaClient_1.default.user.create({
            data: {
                email,
                username: profile.displayName || email.split("@")[0],
                googleId: profile.id,
                avatarUrl: profile.photos?.[0]?.value || null,
            },
        });
        return done(null, { ...newUser, userId: newUser.id });
    }
    catch (error) {
        console.error("❌ Error Google OAuth:", error);
        return done(error);
    }
}));
exports.default = passport_1.default;
