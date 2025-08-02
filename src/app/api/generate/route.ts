import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePagePrompt } from "@/lib/prompts";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        // Parse the request body
        const { fullPath } = await request.json();

        if (!fullPath) {
            return NextResponse.json(
                { error: "fullPath is required" },
                { status: 400 }
            );
        }

        // Configure Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
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
