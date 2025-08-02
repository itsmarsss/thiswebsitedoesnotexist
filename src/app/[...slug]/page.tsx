"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function SlugPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center max-w-2xl w-full shadow-2xl">
                <h1 className="text-4xl font-bold mb-6">Current Path:</h1>
                <div className="bg-black/20 rounded-lg p-4 font-mono text-xl break-all">
                    {pathname}
                </div>

                {searchParams.size > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Search Parameters:
                        </h2>
                        <div className="bg-black/20 rounded-lg p-4 font-mono text-lg text-left">
                            {Array.from(searchParams.entries()).map(
                                ([key, value]) => (
                                    <div key={key} className="mb-2">
                                        <span className="text-pink-300">
                                            {key}
                                        </span>
                                        :
                                        <span className="text-blue-300 ml-2">
                                            {value}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
