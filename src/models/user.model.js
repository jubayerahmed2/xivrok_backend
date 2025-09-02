import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import envVariables from "../config/env.js";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        bio: {
            type: String
        },
        country: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AI"
            }
        ],
        recentViewedAis: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AI"
            }
        ],
        avatar: {
            type: String
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        premiumExpiry: {
            type: Date
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verifyCode: {
            type: String
        },
        verifyExpiry: {
            type: Date
        },
        status: {
            type: String,
            enum: ["active", "banned", "suspended"],
            default: "active"
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

// middleware to hash password when modify password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        envVariables.ACCESS_TOKEN_SECRET,
        {
            expiresIn: envVariables.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        envVariables.REFRESH_TOKEN_SECRET,
        {
            expiresIn: envVariables.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const UserModel = mongoose.model("User", userSchema);
