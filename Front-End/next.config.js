/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "satecma.bg",
        pathname: "/wp-content/uploads/**",
      },
    ],
    loader: "default", // Uses the default loader
    path: "/_next/image",
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
