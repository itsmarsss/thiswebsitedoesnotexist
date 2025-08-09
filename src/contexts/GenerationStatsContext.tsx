"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface GenerationStats {
    totalSiteGenerations: number;
    pathGenerations: number;
}

interface GenerationStatsContextType {
    generationStats: GenerationStats | null;
    setGenerationStats: (stats: GenerationStats | null) => void;
}

const GenerationStatsContext = createContext<
    GenerationStatsContextType | undefined
>(undefined);

export function GenerationStatsProvider({ children }: { children: ReactNode }) {
    const [generationStats, setGenerationStats] =
        useState<GenerationStats | null>(null);

    return (
        <GenerationStatsContext.Provider
            value={{ generationStats, setGenerationStats }}
        >
            {children}
        </GenerationStatsContext.Provider>
    );
}

export function useGenerationStats() {
    const context = useContext(GenerationStatsContext);
    if (context === undefined) {
        throw new Error(
            "useGenerationStats must be used within a GenerationStatsProvider"
        );
    }
    return context;
}
