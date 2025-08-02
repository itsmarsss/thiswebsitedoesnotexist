"use client";

import { ReactNode } from "react";
import Tooltip from "./Tooltip";

interface ToolButtonProps {
    icon: ReactNode;
    text: string;
    tooltip: string;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
}

export default function ToolButton({
    icon,
    text,
    tooltip,
    onClick,
    disabled = false,
    isLoading = false,
    className = "",
}: ToolButtonProps) {
    return (
        <Tooltip text={tooltip}>
            <button
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-left flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                <span className="flex items-center gap-2">
                    <span className="w-5 text-center flex items-center justify-center">
                        {icon}
                    </span>
                    <span>{text}</span>
                </span>
                {isLoading && (
                    <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-transparent rounded-full"></div>
                )}
            </button>
        </Tooltip>
    );
}
