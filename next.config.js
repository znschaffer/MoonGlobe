/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      "/api/*": ["public/**/*", "app/**/*", "node_modules/**/*"],
    },
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/:path*"
            : "/api/",
        // Hi
      },
    ];
  },
};

module.exports = nextConfig;
