"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface GenerationStatsPopupProps {
    totalGenerations: number;
    pathGenerations: number;
    show: boolean;
    onHide: () => void;
}

export default function GenerationStatsPopup({
    totalGenerations,
    pathGenerations,
    show,
    onHide,
}: GenerationStatsPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [countdown, setCountdown] = useState(4);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setCountdown(4);
            setIsPaused(false);
        }
    }, [show]);

    // Countdown timer effect
    useEffect(() => {
        if (!isVisible || isPaused || isHovered) return;

        if (countdown <= 0) {
            setIsVisible(false);
            setTimeout(onHide, 300); // Wait for exit animation
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible, countdown, isPaused, isHovered, onHide]);

    // Handle mouse leave - dismiss if countdown reached 0
    const handleMouseLeave = () => {
        setIsHovered(false);
        if (countdown <= 0) {
            setIsVisible(false);
            setTimeout(onHide, 300);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed top-6 left-6 z-50 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-2xl text-white rounded-2xl p-6 ring-1 ring-white/30 shadow-2xl max-w-sm cursor-pointer"
                    initial={{ opacity: 0, x: -100, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, y: -20, scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => {
                        // Don't trigger if clicking the close button
                        if ((e.target as HTMLElement).closest("button")) return;
                        window.open("/searchboard", "_blank");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Header with success message */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center ring-1 ring-green-500/30">
                                <motion.svg
                                    className="w-6 h-6 text-green-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 500,
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </motion.svg>
                            </div>
                            <div>
                                <motion.div
                                    className="text-lg font-bold text-green-400"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Generated!
                                </motion.div>
                                <motion.div
                                    className="text-sm text-white/60"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    Page created successfully
                                </motion.div>
                            </div>
                        </div>
                        <motion.button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(onHide, 300);
                            }}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg
                                className="w-4 h-4 text-white/70 hover:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <motion.div
                            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 ring-1 ring-blue-500/30 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 400,
                            }}
                        >
                            <div className="text-xs text-blue-300 font-medium mb-2 uppercase tracking-wide">
                                Total Sites
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-blue-400 font-mono leading-none">
                                    {totalGenerations.toLocaleString()}
                                </span>
                                <span className="text-xs text-blue-300 font-normal">
                                    time{totalGenerations !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 ring-1 ring-purple-500/30 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.25,
                                type: "spring",
                                stiffness: 400,
                            }}
                        >
                            <div className="text-xs text-purple-300 font-medium mb-2 uppercase tracking-wide">
                                This Path
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-purple-400 font-mono leading-none">
                                    {pathGenerations}
                                </span>
                                <span className="text-xs text-purple-300 font-normal">
                                    time{pathGenerations !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Progress bar with timer */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
                                animate={{
                                    width: isHovered
                                        ? `${(countdown / 4) * 100}%`
                                        : "0%",
                                }}
                                transition={{
                                    duration: isHovered ? 0.3 : countdown,
                                    ease: isHovered ? "easeOut" : "linear",
                                }}
                            />
                        </div>
                        <div className="text-xs text-white/40 mt-2 text-center">
                            {isHovered
                                ? countdown <= 0
                                    ? "Hover to keep open"
                                    : "Paused - hover to keep open"
                                : countdown <= 0
                                ? "Dismissing..."
                                : `Auto-dismiss in ${countdown}s`}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
