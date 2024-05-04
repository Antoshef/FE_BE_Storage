/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "satecma.bg",
        pathname: "/wp-content/**",
      },
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    // Add a rule to handle HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "raw-loader",
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
