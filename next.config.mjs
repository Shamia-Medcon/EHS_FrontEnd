/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [
      "localhost",
      "ehs-diabetes-conference.com",
    ],
    minimumCacheTTL: 60,
  },
  env: {
    baseURL: process.env.BASE_URL,
  },
};

export default nextConfig;
