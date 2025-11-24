/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
       destination: `${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8453"}/api/:path*`
      },
    ];
  },
};
export default nextConfig;
 