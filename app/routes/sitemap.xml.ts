import { createRoute } from "honox/factory";
import { getPosts } from "../lib/posts";

export default createRoute((c) => {
  const posts = getPosts();
  const baseUrl = "https://terastech.jp";

  const urls = posts.map(({ entryName, frontmatter }) => {
    const lastmod = frontmatter.update || frontmatter.date;
    return `  <url>
    <loc>${baseUrl}/entry/${entryName}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
${urls.join("\n")}
</urlset>`;

  return c.body(sitemap, 200, {
    "Content-Type": "application/xml",
  });
});
