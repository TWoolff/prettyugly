/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.stripe.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
            },
        ],
    },
};

export default nextConfig;
