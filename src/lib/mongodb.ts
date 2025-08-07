import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGO_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if we're in a development environment (local development)
// VERCEL_ENV will be undefined locally, which means we're in development
if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production/preview mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
