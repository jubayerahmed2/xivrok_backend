import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
    {
        ai: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AI"
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const TutorialModel = mongoose.model("Tutorial", tutorialSchema);
