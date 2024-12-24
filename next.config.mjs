/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                // hostname: "eduai.vitaparapharma.com",
                hostname: "/api.eduai.tech",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
