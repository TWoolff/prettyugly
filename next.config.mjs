/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'files.stripe.com',
      'scontent.cdninstagram.com',
      'scontent-arn2-1.cdninstagram.com',
      'graph.instagram.com'
    ],
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
