import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        AI: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AI"
        }
    },
    { timestamps: true }
);

export const FavoriteModal = mongoose.model("Favorite", favoriteSchema);
