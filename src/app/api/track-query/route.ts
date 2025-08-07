import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { QueryCount } from "@/types/query";

export async function POST(request: Request) {
    try {
        const { endpoint } = await request.json();

        if (!endpoint) {
            return NextResponse.json(
                { error: "Endpoint is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("searchStats");
        const collection = db.collection<QueryCount>("queries");

        // Update or insert the query count
        const result = await collection.updateOne(
            { endpoint },
            {
                $inc: { count: 1 },
                $set: { lastQueried: new Date() },
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error tracking query:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("searchStats");
        const collection = db.collection<QueryCount>("queries");

        // Get all queries sorted by count in descending order
        const queries = await collection.find({}).sort({ count: -1 }).toArray();

        return NextResponse.json(queries);
    } catch (error) {
        console.error("Error fetching queries:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
