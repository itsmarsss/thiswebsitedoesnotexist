import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { QueryCount } from "@/types/query";

interface QueryRowProps {
    query: QueryCount;
    index: number;
}

function formatDateTime(date: Date): string {
    const now = new Date();
    const timestamp = new Date(date);

    // If it's today, show "Today at HH:MM"
    if (timestamp.toDateString() === now.toDateString()) {
        return `Today at ${timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }

    // If it's yesterday, show "Yesterday at HH:MM"
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (timestamp.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }

    // Otherwise show "MMM DD at HH:MM"
    return timestamp.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function QueryRow({ query, index }: QueryRowProps) {
    const router = useRouter();

    return (
        <motion.button
            onClick={() => router.push(query.endpoint)}
            className="w-full px-6 py-4 hover:bg-white/5 transition-colors text-left group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 font-semibold mr-3 group-hover:bg-blue-500/30 group-hover:text-blue-300 transition-colors">
                        {index + 1}
                    </span>
                    <div>
                        <p className="text-sm font-medium text-white/90 font-mono group-hover:text-blue-400 transition-colors">
                            {query.endpoint}
                        </p>
                        <p className="text-sm text-white/60">
                            Last queried:{" "}
                            {formatDateTime(new Date(query.lastQueried))}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full ring-1 ring-green-500/30 group-hover:bg-green-500/30 group-hover:text-green-300 transition-colors">
                        {query.count} searches
                    </span>
                </div>
            </div>
        </motion.button>
    );
}
