"use client";

import { useState, useEffect } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    delay?: number;
}

export default function Tooltip({ text, children, delay = 800 }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div className="absolute z-50 px-2 py-1 text-sm text-white bg-black/90 rounded shadow-lg whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-8 z-[10000]">
                    {text}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                </div>
            )}
        </div>
    );
}
