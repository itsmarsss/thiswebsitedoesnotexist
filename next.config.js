/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@google/generative-ai"],
    },
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

module.exports = nextConfig;
