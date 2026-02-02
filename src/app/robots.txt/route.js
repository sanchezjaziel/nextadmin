export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
