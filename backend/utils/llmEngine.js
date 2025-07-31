// utils/llmEngine.js

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate }    from "@langchain/core/prompts";
import { StringOutputParser }    from "@langchain/core/output_parsers";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");

const model = new ChatGoogleGenerativeAI({
  apiKey,
  model: "gemini-2.5-flash-preview-05-20",
});

// 1️⃣ Classify the domain (movie, restaurant, etc.)
export async function classifyDomain(query) {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a domain classifier. Pick exactly one of: movie, restaurant, music, book, place. Return only the lowercase key.`],
    ["user", "{input}"],
  ]);
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const domain = await chain.invoke({ input: query });
  return domain.trim().toLowerCase();
}

// 2️⃣ Extract a concise tag for Qloo
export async function classifyTag(query) {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a tag extractor. From the user’s request, return a single keyword or genre, lowercase, underscores for spaces, no punctuation.`],
    ["user", "{input}"],
  ]);
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const tag = await chain.invoke({ input: query });
  return tag.trim().toLowerCase().replace(/\s+/g, "_");
}

// 3️⃣ Turn raw Qloo JSON into a friendly paragraph
export async function formatRecommendations(query, rawResult) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a lively, personalized assistant writing recommendation messages.

You will receive:
- The user's original query.
- A JSON object (rawResult) containing:
  • domain: the recommendation category (movie, restaurant, music, book, place)
  • items: an array of objects, each with name and id

Your response should:
1. Greet the user by referencing their exact query.
2. Explain why this domain and these items match their request.
3. Present the top 3 recommendations as a numbered list with one-sentence reasons for each.
4. Mention how many total suggestions are available.
5. End with an invitation to ask for more or explore further.

Format your reply as plain text, with the numbered list and no extra metadata.
      `,
    ],
    ["user", `Query: {query}
Data: {data}`]

  ]);
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const result = await chain.invoke({ query, data: JSON.stringify(rawResult) });
  return result.trim();
}

/// --- ✅ NEW FUNCTION ---
export async function enhanceDescription(text) {
 const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert product copywriter. Improve the following product description to make it more engaging, vivid, and realistic, while keeping it concise (maximum 30 words). Return only one improved version.`,
  ],
  ["user", "{input_description}"],
]);


  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const result = await chain.invoke({ input_description: text });
  return result.trim();
}