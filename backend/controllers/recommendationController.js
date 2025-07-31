// controllers/recommendationController.js
// controllers/recommendationController.js

// controllers/recommendationController.js

import User from "../models/User.js";
import {
  classifyDomain, classifyTag, enhanceDescription, formatRecommendations
} from "../utils/llmEngine.js";
import { getQlooRecommendations, validDomains } from "../config/getQlooRecommendations.js";

export async function handleRecommendation(req, res) {
  try {
    const { query } = req.body;
    if (!query?.trim()) return res.status(400).json({ error: "Query required." });

    // Load user
    const userId = req.userId || req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const dbUser = await User.findById(userId).lean();
    if (!dbUser) return res.status(404).json({ error: "User not found." });

    // Build userProfile
    let age = null;
    if (dbUser.dob) {
      const yrs = new Date().getFullYear() - new Date(dbUser.dob).getFullYear();
      const lower = Math.floor(yrs/5)*5;
      age = `${lower}_to_${lower+4}`;
    }
    const userProfile = { age, gender: dbUser.gender, tastes: dbUser.tastes };
    console.log(userProfile);
    

    // Fetch & format
    const rawResult = await getQlooRecommendations(query, userProfile);
    console.log(rawResult);
    
    const friendly = await formatRecommendations(query, rawResult);

    return res.json({
      success: rawResult.success,
      domain:  rawResult.domain,
      items:   rawResult.items,
      message: friendly,
    });
  } catch (err) {
    console.error("Recommendation Error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error." });
  }
}


export const updateDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const improvedDescription = await enhanceDescription(description);
    // You can then update the DB or return it directly
    return res.status(200).json({ improvedDescription });
  } catch (error) {
    console.error("LLM description enhancement error:", error);
    return res.status(500).json({ error: "Failed to improve description" });
  }
};
