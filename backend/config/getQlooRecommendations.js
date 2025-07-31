// services/qlooService.js

import axios from "axios";
import {
  classifyDomain,
  classifyTag,
  formatRecommendations
} from "../utils/llmEngine.js";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.QLOO_API_KEY;
if (!API_KEY) throw new Error("Missing QLOO_API_KEY");

// Supported Qloo entity types
export const validDomains = {
  movie:      "urn:entity:movie",
  restaurant: "urn:entity:restaurant",
  music:      "urn:entity:music",
  book:       "urn:entity:book",
  place:      "urn:entity:place",
};

// Tags that are too generic to filter on
const fallbackTags = new Set([
  "subjective",
  "recommendation",
  "general",
  "generic",
]);

/**
 * Normalize Qloo response into an array of items
 */
function extractItems(results) {
  if (Array.isArray(results)) return results;
  if (results?.entities && Array.isArray(results.entities)) return results.entities;
  return [];
}

async function fetchRec(tag, domainKey, user) {
  const type = validDomains[domainKey];
  if (!type) return { domain: domainKey, success: false, items: [], error: "Invalid domain" };

  const params = {
    "filter.type": type,
    limit: 5,
    ...(user.age    && { "signal.demographics.age.ids": user.age }),
    ...(user.gender && { "signal.demographics.gender": user.gender.toLowerCase() }),
  };

  if (tag && !fallbackTags.has(tag)) {
    params["signal.tags"] = [`urn:tag:keyword:media:${tag}`];
  }

  Object.entries(user.tastes || {}).forEach(([cat, arr]) => {
    if (Array.isArray(arr) && arr.length) {
      params["signal.tastes"] = (params["signal.tastes"] || []).concat(
        arr.slice(0,3).map(t =>
          `urn:tag:keyword:${cat}:${t.trim().toLowerCase().replace(/\s+/g, "_")}`
        )
      );
    }
  });

  // movie needs release_year filters
  if (domainKey === "movie") {
    params["filter.release_year.min"] = 1900;
    params["filter.release_year.max"] = new Date().getFullYear();
  }

  try {
    const res = await axios.get("https://hackathon.api.qloo.com/v2/insights", {
      headers: { "x-api-key": API_KEY },
      params,
    });
    const rawResults = res.data.results;
   
    
    const entities = extractItems(rawResults);
    const items = entities.map((it, i) => ({ id: i+1, name: it.name || it.title || it.entity || "Unknown" }));
    return { domain: domainKey, success: items.length>0, items };
  } catch (err) {
    return { domain: domainKey, success: false, items: [], error: err.response?.data || err.message };
  }
}

/**
 * Classify into domain(s), extract tag, then fetch recommendations across domains.
 * If user query implies multiple domains, fetch for each.
 * @param {string} query
 * @param {object} user
 * @param {string[]} domainsList optional list of domain keys to fetch
 */
export async function getQlooRecommendations(query, user = {}, domainsList = Object.keys(validDomains)) {
  // Classify primary domain
  const rawDomain = await classifyDomain(query);
  const primary = rawDomain.trim().toLowerCase();

  // Extract tag
  const rawTag = await classifyTag(query);
  const tag = rawTag.trim().toLowerCase().replace(/\s+/g, "_");

  // Determine domains to query: include primary + any requested
  const domains = Array.from(new Set([primary, ...domainsList]))
    .filter(d => validDomains[d]);

  // Fetch in parallel across domains
  const results = await Promise.all(
    domains.map(d => fetchRec(tag, d, user))
  );

  // Attach friendly message per domain
  for (const r of results) {
    r.message = await formatRecommendations(query, r);
  }

  return results;
}
