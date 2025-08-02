"use client";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center max-w-2xl w-full shadow-2xl">
                <h1 className="text-4xl font-bold mb-6">Current Path:</h1>
                <div className="bg-black/20 rounded-lg p-4 font-mono text-xl">
                    /
                </div>
                <p className="mt-6 text-lg opacity-80">
                    Try adding any path to the URL to see it displayed here!
                </p>
            </div>
        </div>
    );
}
