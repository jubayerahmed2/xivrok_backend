import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        bestCategory: {
            type: String,
            required: true
        },
        tags: [{ type: String, required: true, trim: true }],
        usage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutorial"
        },
        logo: {
            type: String,
            required: true
        },
        liveLink: {
            type: String,
            required: true
        },
        launchedAt: {
            type: Date
        },
        batch: {
            type: String
        }
    },
    { timestamps: true }
);

export const AiModel = mongoose.model("AI", aiSchema);
