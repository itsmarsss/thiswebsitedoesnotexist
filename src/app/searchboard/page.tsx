"use client";

import { QueryCount } from "@/types/query";
import { useEffect, useState } from "react";

export default function SearchBoard() {
    const [queries, setQueries] = useState<QueryCount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQueries() {
            try {
                const response = await fetch("/api/track-query", {
                    next: { revalidate: 60 }, // Revalidate every minute
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch query stats");
                }

                const data = await response.json();
                setQueries(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load queries"
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchQueries();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Loading...
                    </h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-red-600 mb-8">
                        Error: {error}
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Search Analytics Dashboard
                </h1>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                            Most Popular Queries
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Ranked by number of searches
                        </p>
                    </div>

                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {queries.map((query, index) => (
                                <li
                                    key={query.endpoint}
                                    className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-900 font-semibold mr-3">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                    {query.endpoint}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Last queried:{" "}
                                                    {new Date(
                                                        query.lastQueried
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                {query.count} searches
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {queries.length === 0 && (
                                <li className="px-4 py-8 sm:px-6 text-center text-gray-500">
                                    No queries recorded yet
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
