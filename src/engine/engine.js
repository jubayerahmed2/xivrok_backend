import { AiModel } from "../models/ai.model.js";
import { extractKeywords } from "./extractkeywords.js";

const engine = async (category, goal) => {
    // 1️⃣ Extract meaningful keywords
    const extractGoal = extractKeywords(goal);
    const extractCategory = extractKeywords(category);

    // 2️⃣ Combine keywords into a single search string
    const searchString = [...extractGoal, ...extractCategory].join(" ");

    // 3️⃣ Use MongoDB $text search
    const result = await AiModel.find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } } // include relevance score
    )
        .sort({ score: { $meta: "textScore" } }) // sort by relevance
        .limit(8)
        .select("-tags -__v");

    return result;
};

export { engine };
