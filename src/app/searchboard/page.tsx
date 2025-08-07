"use client";

import { Suspense } from "react";
import SearchBoardContent from "@/components/SearchBoardContent";

function LoadingFallback() {
    return (
        <div className="fixed inset-0 min-h-screen bg-black/95 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto p-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/20">
                    <div className="flex items-center gap-3">
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
                        <h1 className="text-xl font-semibold text-white">
                            Loading Analytics...
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchBoard() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <SearchBoardContent />
        </Suspense>
    );
}
