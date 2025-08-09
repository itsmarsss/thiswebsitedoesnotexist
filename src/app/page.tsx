"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Icon from "@/components/Icon";
import { examplePaths } from "@/lib/randomPaths";
import { features } from "@/lib/features";

export default function HomePage() {
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [totalSiteGenerations, setTotalSiteGenerations] = useState(0);
    const [estimatedCost, setEstimatedCost] = useState("0.00");
    const [userGeneratedCount, setUserGeneratedCount] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (path?: string) => {
        const targetPath = path || searchInput;
        if (!targetPath.trim()) return;

        setIsLoading(true);
        const formattedPath = targetPath.startsWith("/")
            ? targetPath
            : `/${targetPath}`;
        router.push(formattedPath);
    };

    const handleExampleClick = (path: string) => {
        setSearchInput(path);
        handleSearch(path);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Load stats on component mount
    useEffect(() => {
        // Load user generation count from localStorage
        const savedCount = localStorage.getItem("userGeneratedPages");
        if (savedCount) {
            setUserGeneratedCount(parseInt(savedCount, 10) || 0);
        }

        // Fetch global stats from API
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/track-query?page=1");
                if (response.ok) {
                    const data = await response.json();
                    setTotalSiteGenerations(data.totalSiteGenerations || 0);
                    setEstimatedCost(data.estimatedCost || "0.00");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden relative">
            {/* Playful animated background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating shapes */}
                <div
                    className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-bounce"
                    style={{ animationDelay: "0s", animationDuration: "6s" }}
                ></div>
                <div
                    className="absolute top-40 right-20 w-20 h-20 bg-pink-400/30 rounded-lg blur-lg animate-bounce rotate-45"
                    style={{ animationDelay: "2s", animationDuration: "4s" }}
                ></div>
                <div
                    className="absolute bottom-40 left-1/4 w-16 h-16 bg-cyan-400/25 rounded-full blur-md animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-400/20 rounded-xl blur-lg animate-ping"
                    style={{ animationDelay: "3s", animationDuration: "8s" }}
                ></div>
                <div
                    className="absolute bottom-20 right-10 w-28 h-28 bg-orange-400/15 rounded-full blur-2xl animate-bounce"
                    style={{ animationDelay: "4s", animationDuration: "7s" }}
                ></div>

                {/* Scattered dots */}
                <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-twinkle"></div>
                <div
                    className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-twinkle"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-twinkle"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Add custom CSS for twinkle animation */}
            <style jsx>{`
                @keyframes twinkle {
                    0%,
                    100% {
                        opacity: 0.2;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }
            `}</style>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <motion.header
                    className="p-4 sm:p-6 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-2 relative">
                            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent transform -rotate-2 inline-block">
                                This Website
                            </span>
                        </h1>
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 transform rotate-1"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            <span className="relative">
                                Does Not Exist
                                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                                    !
                                </div>
                            </span>
                        </motion.h2>
                    </motion.div>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        Build sites that never should&apos;ve existed. AI
                        hallucinates digital slop pages cuz apparently the
                        internet didn&apos;t have enough crap already.
                    </motion.p>
                </motion.header>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 space-y-8 sm:space-y-12">
                    {/* Search Section */}
                    <motion.div
                        className="w-full max-w-2xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <div className="relative px-4">
                            <div className="relative bg-white rounded-3xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    onKeyDown={handleKeyPress}
                                    placeholder="Where to captain?"
                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-800 bg-transparent rounded-2xl focus:outline-none placeholder-gray-500 pr-24 sm:pr-32"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    onClick={() => handleSearch()}
                                    disabled={isLoading || !searchInput.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:shadow-xl hover:scale-110 hover:rotate-2 active:scale-95 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin cursor-not-allowed" />
                                    ) : (
                                        <>
                                            <span className="hidden sm:inline">
                                                Generate
                                            </span>
                                            <span className="sm:hidden">
                                                Go
                                            </span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                            <div className="text-center mt-4">
                                <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full break-words">
                                    <span className="hidden sm:inline">
                                        Try: {examplePaths[0]} or{" "}
                                        {examplePaths[1]}
                                    </span>
                                    <span className="sm:hidden">
                                        Try: {examplePaths[0]}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Example Paths */}
                    <motion.div
                        className="w-full max-w-4xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-white/80 text-center mb-4 px-4">
                            Or let our algorithm choose your digital goon room:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                            {examplePaths.map((path, index) => (
                                <motion.button
                                    key={path}
                                    onClick={() => handleExampleClick(path)}
                                    className="px-3 sm:px-5 py-2 sm:py-3 bg-white/90 text-gray-800 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-110 hover:rotate-2 active:scale-95 transition-all duration-300 border-2 border-transparent hover:border-yellow-300 cursor-pointer"
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                        rotate: ((index * 17) % 10) - 5,
                                    }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.6 + index * 0.1,
                                    }}
                                    style={{
                                        minHeight: "44px",
                                        minWidth: "44px",
                                    }}
                                >
                                    {path}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        className="w-full max-w-6xl align-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16 px-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="flex items-center justify-center hover:scale-105 hover:-translate-y-2 transition-transform duration-300"
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                    rotate: ((index * 13) % 6) - 3, // Deterministic rotation for features
                                }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.6 + index * 0.2,
                                }}
                            >
                                <div className="relative bg-white/95 text-gray-800 p-4 sm:p-6 rounded-3xl shadow-2xl transform transition-all duration-300 border-4 border-dashed border-transparent hover:border-pink-300">
                                    {/* Decorative corner sticker */}
                                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold transform rotate-12">
                                        {index + 1}
                                    </div>

                                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                                        <Icon
                                            type={
                                                feature.icon as
                                                    | "sparkles"
                                                    | "dice"
                                                    | "analytics"
                                            }
                                            className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600"
                                        />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="w-full max-w-6xl px-4 sm:px-6 my-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.3 }}
                    >
                        The Digital Wasteland Stats
                    </motion.h2>
                    <div className="w-full max-w-6xl align-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
                        {/* Total Pages Generated */}
                        <motion.div
                            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 ring-1 ring-green-500/30 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30, rotate: -2 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 2.4 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/30 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-green-400">
                                            Total Page Requests
                                        </h3>
                                        <p className="text-green-300/70 text-sm">
                                            Generational ai SLOP
                                        </p>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-green-400 font-mono">
                                    {totalSiteGenerations.toLocaleString()}
                                </div>
                            </div>
                        </motion.div>

                        {/* User Generated Pages */}
                        <motion.div
                            className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl rounded-2xl p-6 ring-1 ring-blue-500/30 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30, rotate: 1 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 2.5 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-blue-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-400">
                                            You Requested
                                        </h3>
                                        <p className="text-blue-300/70 text-sm">
                                            Your{" "}
                                            <span className="line-through">
                                                body
                                            </span>{" "}
                                            page count
                                        </p>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-blue-400 font-mono">
                                    {userGeneratedCount.toLocaleString()}
                                </div>
                            </div>
                        </motion.div>

                        {/* Estimated Cost */}
                        <motion.div
                            className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 ring-1 ring-red-500/30 relative overflow-hidden sm:col-span-2 lg:col-span-1"
                            initial={{ opacity: 0, y: 30, rotate: -1 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 2.6 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6c-2.4855 0-4.5 1.3425-4.5 3s2.0145 3 4.5 3 4.5 1.3425 4.5 3-2.0145 3-4.5 3m0-12c1.665 0 3.12 0.603 3.8985 1.5M12 6V4.5m0 1.5v12m0 0v1.5m0-1.5c-1.665 0-3.12-0.603-3.8985-1.5"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-400">
                                            Estimated Cost
                                        </h3>
                                        <p className="text-red-300/70 text-sm">
                                            Wallet is shallow...
                                        </p>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-red-400 font-mono">
                                    ${estimatedCost}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    className="p-4 sm:p-6 text-center text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                >
                    <p className="text-sm">
                        Where AI slop meets the internet • Built for uncurious
                        minds &#128148;&#129344;
                    </p>
                </motion.footer>
            </div>

            <Analytics />
            <SpeedInsights />
        </div>
    );
}
