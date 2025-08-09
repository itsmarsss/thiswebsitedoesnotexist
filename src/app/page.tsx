"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Icon from "@/components/Icon";
import { generateRandomPath } from "@/lib/randomPaths";

const features = [
    {
        icon: "sparkles",
        title: "Made Fresh Every Time",
        description:
            "Every URL you type creates something completely new. No templates, no copies.. Just pure digital creativity.",
    },
    {
        icon: "dice",
        title: "Go Anywhere You Want",
        description:
            "Dream up any path and watch it come to life. From /secret-ninja-dojo to /grandmother's-spaceship. (it's all possible)",
    },
    {
        icon: "analytics",
        title: "See What Others Explore",
        description:
            "Discover the weird and wonderful paths people are creating. You might find your next favorite imaginary place.",
    },
];

const examplePaths = Array.from({ length: 7 }, () => generateRandomPath());

export default function HomePage() {
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
                        className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        Type any URL you can imagine and watch a whole website
                        spring to life. Every path is a new adventure waiting to
                        be discovered.
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
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:shadow-xl transition-all duration-300 cursor-pointer text-sm sm:text-base"
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin cursor-not-allowed" />
                                    ) : (
                                        <>
                                            <span className="hidden sm:inline">
                                                🚀 Let's Go!
                                            </span>
                                            <span className="sm:hidden">
                                                🚀 Go!
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
                            Or pick one of these wild ideas:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                            {examplePaths.map((path, index) => (
                                <motion.button
                                    key={path}
                                    onClick={() => handleExampleClick(path)}
                                    className="px-3 sm:px-5 py-2 sm:py-3 bg-white/90 text-gray-800 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-yellow-300 cursor-pointer"
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
                                    whileHover={{
                                        scale: 1.1,
                                        boxShadow:
                                            "0 10px 25px rgba(0,0,0,0.2)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    // Make touch-friendly
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
                                className="flex items-center justify-center "
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                    rotate: ((index * 13) % 6) - 3, // Deterministic rotation for features
                                }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 2 + index * 0.2,
                                }}
                                whileHover={{ scale: 1.05, y: -10 }}
                            >
                                <div className="relative bg-white/95 text-gray-800 p-4 sm:p-6 rounded-3xl shadow-2xl transform transition-all duration-300 border-4 border-dashed border-transparent hover:border-pink-300">
                                    {/* Decorative corner sticker */}
                                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold transform rotate-12">
                                        {index + 1}
                                    </div>

                                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                                        <Icon
                                            type={feature.icon as any}
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
