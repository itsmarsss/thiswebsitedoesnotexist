"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function SlugPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Combine pathname with search params if they exist
    const fullPath =
        searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;

    useEffect(() => {
        const generatePage = async () => {
            try {
                setIsLoading(true);
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

                // Write the HTML to the iframe
                const iframeDoc = iframeRef.current?.contentDocument;
                if (iframeDoc) {
                    iframeDoc.open();
                    iframeDoc.write(data.html);
                    iframeDoc.close();
                }
            } catch (err) {
                console.error("Error:", err);
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setIsLoading(false);
            }
        };

        generatePage();
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
        <div className="w-full h-screen flex flex-col">
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 z-10">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center max-w-2xl w-full shadow-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                        <div className="text-xl">Generating page for:</div>
                        <div className="bg-black/20 rounded-lg p-4 font-mono text-lg mt-4 break-all">
                            {fullPath}
                        </div>
                    </div>
                </div>
            )}
            <iframe
                ref={iframeRef}
                className="w-full h-full border-none"
                title="Generated Content"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
