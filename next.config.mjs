/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Ürün görselleri bu adresten geliyor, Next.js'in optimize etmesine izin veriyoruz
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
};

export default nextConfig;
