import { Style } from "hono/css";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Header } from "../components/header";
import { blogName } from "../constants";
import ThemeButton from "../islands/themeButton";
import styles from "../styles/style.css?url";

export default jsxRenderer(({ children, title, entryName, frontmatter }) => {
    const pageTitle = title ? `${title} - ${blogName}` : blogName;
    const ogpPath = title ? `/ogps/${entryName}.png` : "/ogp.png";
    const c = useRequestContext();
    const pagePath = c.req.path;
    const description =
        frontmatter?.description ??
        "日々の開発記録をまとめるエンジニア備忘録的なもの";

    return (
        <html lang="ja">
            <head>
                <meta http-equiv="content-language" content="ja" />
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content={description} />
                {import.meta.env.VITE_ENV === "production" ? (
                    <>
                        <meta
                            property="og:url"
                            content={`https://terastech.jp${pagePath}`}
                        />
                        <meta
                            property="og:image"
                            content={`https://terastech.jp${ogpPath}`}
                        />
                        <meta
                            name="x:image"
                            content={`https://terastech.jp${ogpPath}`}
                        />
                        <link
                            rel="icon"
                            href="https://terastech.jp/favicon.ico"
                        />
                    </>
                ) : (
                    <>
                        <meta property="og:url" content={pagePath} />
                        <meta property="og:image" content={ogpPath} />
                        <meta name="x:image" content={ogpPath} />
                        <link rel="icon" href="/favicon.ico" />
                    </>
                )}
                {import.meta.env.PROD ? (
                    <script src="/static/theme.js" />
                ) : (
                    <script src="/app/theme.ts" />
                )}
                <meta
                    property="og:type"
                    content={title ? "article" : "website"}
                />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content={blogName} />
                <meta name="x:card" content="summary_large_image" />
                <meta name="x:site" content="@system_dolphin" />
                <meta name="x:title" content={pageTitle} />
                <meta name="x:description" content={description} />
                <link
                    rel="canonical"
                    href={`https://terastech.jp${pagePath}`}
                />
                {frontmatter?.date && (
                    <meta
                        property="article:published_time"
                        content={frontmatter.date}
                    />
                )}
                {frontmatter?.update && (
                    <meta
                        property="article:modified_time"
                        content={frontmatter.update}
                    />
                )}
                <title>{pageTitle}</title>
                <Script src="/app/client.ts" async />
                <Style />
                {import.meta.env.PROD ? (
                    <link href="/styles/style.css" rel="stylesheet" />
                ) : (
                    <link href={styles} rel="stylesheet" />
                )}
                <link rel="icon" href="/favicon.ico" sizes="32x32" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <link rel="manifest" href="/manifest.webmanifest" />
                {title && frontmatter ? (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Article",
                                headline: frontmatter.title,
                                description: frontmatter.description,
                                datePublished: frontmatter.date,
                                dateModified:
                                    frontmatter.update || frontmatter.date,
                                author: {
                                    "@type": "Person",
                                    name: "terao",
                                },
                                publisher: {
                                    "@type": "Organization",
                                    name: "terastech",
                                    url: "https://terastech.jp",
                                },
                                image: `https://terastech.jp/ogps/${entryName}.png`,
                                url: `https://terastech.jp/entry/${entryName}`,
                            }),
                        }}
                    />
                ) : (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                name: "terastech",
                                url: "https://terastech.jp",
                            }),
                        }}
                    />
                )}
            </head>
            <body
                class={
                    "flex flex-col items-center mb-2 bg-[#fbf9f2] dark:bg-zinc-800"
                }
            >
                <Header>
                    <ThemeButton />
                </Header>
                <main
                    class={
                        "w-full lg:max-w-[90%] mt-22 px-12 max-sm:px-0 max-md:mt-12 max-sm:mt-18"
                    }
                >
                    {children}
                </main>
            </body>
        </html>
    );
});
