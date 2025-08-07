"use client";

import { QueryCount } from "@/types/query";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import QueryRow from "@/components/QueryRow";
import { useInView } from "react-intersection-observer";
import { useRouter, useSearchParams } from "next/navigation";

const container: Variants = {
    hidden: {
        opacity: 0,
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

const item: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
        transition: { duration: 0.2 },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 25,
        },
    },
};

interface QueryResponse {
    queries: QueryCount[];
    totalCount: number;
    hasMore: boolean;
}

export default function SearchBoard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("q") || "";

    const [queries, setQueries] = useState<QueryCount[]>([]);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout>(null);

    // Infinite scroll observer
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0,
    });

    const fetchQueries = useCallback(
        async (pageNum: number, search: string, isNewSearch = false) => {
            try {
                setIsFetchingMore(true);
                const response = await fetch(
                    `/api/track-query?page=${pageNum}&search=${encodeURIComponent(
                        search
                    )}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch query stats");
                }

                const data: QueryResponse = await response.json();

                // If it's a new search, replace the queries, otherwise append
                setQueries((prev) => {
                    if (isNewSearch) {
                        return data.queries;
                    }

                    // Create a Set of existing endpoints to prevent duplicates
                    const existingEndpoints = new Set(
                        prev.map((q) => q.endpoint)
                    );

                    // Only add queries that don't already exist
                    const newQueries = data.queries.filter(
                        (q) => !existingEndpoints.has(q.endpoint)
                    );

                    return [...prev, ...newQueries];
                });

                setHasMore(data.hasMore);
            } catch (err) {
                console.error("Error fetching queries:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load queries"
                );
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        },
        []
    );

    // Initial load
    useEffect(() => {
        fetchQueries(1, initialSearch, true);
    }, [fetchQueries, initialSearch]);

    // Handle search with debounce and URL update
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            // Update URL with search term
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                params.set("q", searchTerm);
            } else {
                params.delete("q");
            }
            router.replace(`/searchboard?${params.toString()}`);

            setPage(1);
            fetchQueries(1, searchTerm, true);
        }, 300) as unknown as NodeJS.Timeout;

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [searchTerm, router, searchParams, fetchQueries]);

    // Handle infinite scroll
    useEffect(() => {
        if (inView && hasMore && !isFetchingMore && !isLoading) {
            setPage((prev) => prev + 1);
            fetchQueries(page + 1, searchTerm);
        }
    }, [
        inView,
        hasMore,
        isFetchingMore,
        isLoading,
        page,
        searchTerm,
        fetchQueries,
    ]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle search clear
    const handleClearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="fixed inset-0 min-h-screen bg-black/95">
            <div className="absolute inset-0 overflow-auto">
                <div className="p-4 sm:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                className="w-full max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
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
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                className="w-full max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/20">
                                    <div className="flex items-center gap-3">
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
                                        <h1 className="text-xl font-semibold text-white">
                                            Error: {error}
                                        </h1>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                className="max-w-4xl mx-auto"
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, y: -20 }}
                                variants={container}
                            >
                                <motion.div
                                    variants={item}
                                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/20 relative overflow-hidden mb-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none" />

                                    <div className="relative">
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            Search Analytics Dashboard
                                        </h1>
                                        <p className="text-white/60 mt-2">
                                            Track and analyze popular page
                                            requests
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={item}
                                    className="bg-white/10 backdrop-blur-xl rounded-2xl ring-1 ring-white/20 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none" />

                                    <div className="relative">
                                        <div className="px-6 py-5">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <h2 className="text-lg font-semibold text-white">
                                                        Most Popular Queries
                                                    </h2>
                                                    <p className="text-white/60 text-sm">
                                                        Ranked by number of
                                                        searches
                                                    </p>
                                                </div>
                                                <div className="relative">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Search endpoints..."
                                                            value={searchTerm}
                                                            onChange={
                                                                handleSearchChange
                                                            }
                                                            className="w-full sm:w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent pr-8"
                                                        />
                                                        {searchTerm && (
                                                            <button
                                                                onClick={
                                                                    handleClearSearch
                                                                }
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent pointer-events-none rounded-lg" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10">
                                            <motion.div
                                                variants={container}
                                                className="divide-y divide-white/10"
                                            >
                                                <AnimatePresence mode="popLayout">
                                                    {queries.map(
                                                        (query, index) => (
                                                            <motion.div
                                                                key={
                                                                    query.endpoint
                                                                }
                                                                variants={item}
                                                                layout
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    y: -20,
                                                                }}
                                                            >
                                                                <QueryRow
                                                                    query={
                                                                        query
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                />
                                                            </motion.div>
                                                        )
                                                    )}
                                                </AnimatePresence>
                                                {queries.length === 0 ? (
                                                    <motion.div
                                                        variants={item}
                                                        className="px-6 py-8 text-center text-white/60"
                                                    >
                                                        {searchTerm
                                                            ? "No matching queries found"
                                                            : "No queries recorded yet"}
                                                    </motion.div>
                                                ) : (
                                                    <div
                                                        ref={loadMoreRef}
                                                        className="p-4 flex justify-center"
                                                    >
                                                        {isFetchingMore && (
                                                            <div className="text-white/60">
                                                                Loading more...
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
