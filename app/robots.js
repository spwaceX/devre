// /robots.txt: arama motorlarına siteyi tarayabileceklerini ve site haritasının yerini söyler
export default function robots() {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/sepet" },
    sitemap: `${base}/sitemap.xml`,
  };
}
