import { MongoClient } from "mongodb";
import type { QueryCount } from "../src/types/query";

const data: QueryCount[] = [];

function validateMongoURI(uri: string): boolean {
    // Basic MongoDB URI validation
    const mongoURIPattern = /^mongodb(?:\+srv)?:\/\/[^\s]+$/;
    return mongoURIPattern.test(uri);
}

async function importData() {
    if (!process.env.MONGODB_URI) {
        console.error("Error: MONGODB_URI not found in .env");
        console.error(
            "Please ensure your .env file contains a valid MONGODB_URI"
        );
        process.exit(1);
    }

    if (!validateMongoURI(process.env.MONGODB_URI)) {
        console.error("Error: Invalid MONGODB_URI format");
        console.error(
            "Expected format: mongodb+srv://<username>:<password>@<cluster>/<database>"
        );
        console.error("Or: mongodb://<host>:<port>/<database>");
        process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    const client = new MongoClient(process.env.MONGODB_URI, {
        connectTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000, // 45 seconds
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");

        const db = client.db("searchStats");
        const collection = db.collection<QueryCount>("queries");

        // Clear existing data
        const deleteResult = await collection.deleteMany({});
        console.log(`Cleared ${deleteResult.deletedCount} existing records`);

        // Insert new data with random timestamps
        const documents = data.map((item) => ({
            endpoint: item.endpoint,
            count: item.count,
            lastQueried: item.lastQueried,
        }));

        const insertResult = await collection.insertMany(documents);
        console.log(
            `Successfully imported ${insertResult.insertedCount} records`
        );
    } catch (error) {
        console.error("\nConnection Error Details:");
        if (error instanceof Error) {
            console.error(`Name: ${error.name}`);
            console.error(`Message: ${error.message}`);
            if ("code" in error) {
                console.error(`Code: ${(error as any).code}`);
            }
        } else {
            console.error(error);
        }
        process.exit(1);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

importData();
