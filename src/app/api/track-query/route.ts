import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { QueryCount } from "@/types/query";

const ITEMS_PER_PAGE = 20;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const search = searchParams.get("search") || "";
        const skip = (page - 1) * ITEMS_PER_PAGE;

        const client = await clientPromise;
        const db = client.db("searchStats");
        const collection = db.collection<QueryCount>("queries");

        // Build search query
        const searchQuery = search
            ? { endpoint: { $regex: search, $options: "i" } }
            : {};

        // Get total count for the search query
        const totalCount = await collection.countDocuments(searchQuery);

        // Get paginated and sorted results
        // Add a secondary sort by endpoint to ensure consistent ordering
        const queries = await collection
            .aggregate([
                { $match: searchQuery },
                {
                    $sort: {
                        count: -1,
                        endpoint: 1, // Secondary sort to ensure consistent ordering
                    },
                },
                { $skip: skip },
                { $limit: ITEMS_PER_PAGE },
                // Add a stage to ensure we're getting unique endpoints
                {
                    $group: {
                        _id: "$endpoint",
                        endpoint: { $first: "$endpoint" },
                        count: { $first: "$count" },
                        lastQueried: { $first: "$lastQueried" },
                    },
                },
                {
                    $sort: {
                        count: -1,
                        endpoint: 1,
                    },
                },
            ])
            .toArray();

        // Log for debugging
        console.log(
            `Fetched ${queries.length} unique queries for page ${page}`
        );

        return NextResponse.json({
            queries,
            totalCount,
            hasMore: totalCount > skip + queries.length,
        });
    } catch (error) {
        console.error("Error fetching queries:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
