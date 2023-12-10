/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `http://localhost:3001/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;
