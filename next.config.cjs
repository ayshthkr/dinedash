/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        ppr: true
    },
    images: {
        remotePatterns: [new URL('https://dolmbkmesxrycbepcsme.supabase.co/**')],
    }
};

module.exports = nextConfig;
