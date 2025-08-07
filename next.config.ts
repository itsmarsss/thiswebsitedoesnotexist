import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["@google/generative-ai"],

    async redirects() {
        return [
            {
                source: "/404",
                destination: "/",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
