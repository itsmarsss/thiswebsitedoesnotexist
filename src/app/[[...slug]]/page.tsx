"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const loadingMessages = [
    "Searching through the multiverse...",
    "Consulting the digital oracle...",
    "Generating alternate reality...",
    "Borrowing ideas from parallel dimensions...",
    "Calculating quantum possibilities...",
    "Mining the depths of imagination...",
    "Synthesizing digital dreams...",
    "Exploring uncharted domains...",
    "Weaving digital narratives...",
    "Constructing virtual realities...",
];

export default function SlugPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const fullPath =
        searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;

    useEffect(() => {
        // Cycle through loading messages
        const messageInterval = setInterval(() => {
            setLoadingMessageIndex((i) => (i + 1) % loadingMessages.length);
        }, 2000);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((p) => {
                if (p >= 90) return p; // Slow down at 90%
                return Math.min(p + Math.random() * 15, 90);
            });
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    useEffect(() => {
        const generatePage = async () => {
            try {
                setIsLoading(true);
                setProgress(0);
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

                setProgress(100);
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
            <div className="min-h-screen flex items-center justify-center bg-black/95 text-white p-4">
                <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold">
                            Generation Failed
                        </h1>
                    </div>
                    <p className="text-white/80 mb-6 font-mono text-sm break-all bg-white/5 rounded-lg p-4">
                        {error}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            {isLoading && (
                <div className="absolute inset-0 bg-black/95 flex items-center justify-center p-4 z-10">
                    <div className="max-w-md w-full">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/20 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-500 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-white">
                                        Building Page
                                    </h1>
                                    <p className="text-white/60 text-sm">
                                        {loadingMessages[loadingMessageIndex]}
                                    </p>
                                </div>
                            </div>
                            <div className="font-mono text-sm break-all bg-white/5 rounded-lg p-4 mb-4 text-white">
                                {fullPath}
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500/50 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 bg-white/10 rounded-lg animate-pulse"
                                    style={{
                                        width: `${85 - i * 15}%`,
                                        animationDelay: `${i * 200}ms`,
                                    }}
                                />
                            ))}
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
