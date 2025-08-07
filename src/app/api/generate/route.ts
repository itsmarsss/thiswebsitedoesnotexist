import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePagePrompt } from "@/lib/prompts";
import clientPromise from "@/lib/mongodb";
import type { QueryCount } from "@/types/query";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function trackQuery(endpoint: string) {
    try {
        const client = await clientPromise;
        const db = client.db("searchStats");
        const collection = db.collection<QueryCount>("queries");

        // Update or insert the query count
        await collection.updateOne(
            { endpoint },
            {
                $inc: { count: 1 },
                $set: { lastQueried: new Date() },
            },
            { upsert: true }
        );
    } catch (error) {
        // Log error but don't fail the request
        console.error("Error tracking query:", error);
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        // Parse the request body
        let { fullPath } = await request.json();

        if (!fullPath) {
            return NextResponse.json(
                { error: "fullPath is required" },
                { status: 400 }
            );
        }

        // Check if the path exceeds the maximum length
        fullPath = fullPath.slice(0, 256);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 3000,
            },
        });

        // Get prompt from template
        const prompt = generatePagePrompt(fullPath);

        // Generate content
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
            ],
        });

        const response = await result.response;
        const generatedHTML = response.text();

        // Track the query after successful generation
        await trackQuery(fullPath);

        console.log("Generated HTML for path:", fullPath);
        console.log(prompt);

        return NextResponse.json({ html: generatedHTML });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json(
            {
                error: "Failed to generate content",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
