"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SlugPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    // Combine pathname with search params if they exist
    const fullPath =
        searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;

    useEffect(() => {
        const generatePage = async () => {
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ fullPath }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.details || "Failed to generate page");
                }

                const data = await response.json();

                // Replace the entire document with the generated HTML
                document.open();
                document.write(data.html);
                document.close();
            } catch (err) {
                console.error("Error:", err);
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            }
        };

        // Show loading state first
        document.body.style.cursor = "wait";
        generatePage();

        // Cleanup
        return () => {
            document.body.style.cursor = "default";
        };
    }, [fullPath]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center max-w-2xl w-full shadow-2xl">
                    <h1 className="text-2xl font-bold mb-4">
                        Error Generating Page
                    </h1>
                    <div className="bg-black/20 rounded-lg p-4 font-mono text-lg break-all">
                        {error}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center max-w-2xl w-full shadow-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                <div className="text-xl">Generating page for:</div>
                <div className="bg-black/20 rounded-lg p-4 font-mono text-lg mt-4 break-all">
                    {fullPath}
                </div>
            </div>
        </div>
    );
}
