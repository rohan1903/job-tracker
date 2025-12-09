/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable production source maps to avoid issues
  productionBrowserSourceMaps: false,
  
  // Configure Turbopack (Next.js 16+ uses Turbopack by default)
  turbopack: {
    // Empty config to explicitly enable Turbopack and silence the warning
  },
};

export default nextConfig;

