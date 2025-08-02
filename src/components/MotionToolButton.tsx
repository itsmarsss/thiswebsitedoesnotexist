"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";

interface MotionToolButtonProps {
    icon: ReactNode;
    text: string;
    tooltip: string;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
}

export default function MotionToolButton({
    icon,
    text,
    tooltip,
    onClick,
    disabled = false,
    isLoading = false,
    className = "",
}: MotionToolButtonProps) {
    return (
        <Tooltip text={tooltip}>
            <motion.button
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`w-full px-4 py-2 bg-black/20 hover:bg-black/40 rounded-lg text-left flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="flex items-center gap-2 min-w-0">
                    <span className="w-5 flex-none flex items-center justify-center">
                        {icon}
                    </span>
                    <span className="truncate">{text}</span>
                </span>
                {isLoading && (
                    <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-transparent rounded-full flex-none"></div>
                )}
            </motion.button>
        </Tooltip>
    );
}
