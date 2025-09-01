import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tags: [
            {
                type: String,
                required: true
            }
        ],
        views: {
            type: Number,
            default: 0
        },
        peopleUsed: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export const PromptModel = mongoose.model("Prompt", promptSchema);
