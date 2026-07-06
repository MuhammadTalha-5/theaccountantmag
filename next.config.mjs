/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.theaccountantmag.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        // Gravatar (default WP avatars)
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
};

export default nextConfig;
