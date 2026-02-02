export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const urls = ["/", "/accounts"];
  const now = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (path) =>
        `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${
          path === "/" ? "1.0" : "0.8"
        }</priority>\n  </url>`
    )
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
