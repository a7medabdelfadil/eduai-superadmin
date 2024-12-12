/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "eduai.vitaparapharma.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
