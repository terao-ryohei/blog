import { Parser, jaModel } from "budoux";
import { Fragment } from "hono/jsx/jsx-runtime";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { ArticleListItem } from "../../components/articleListItem";
import { Badge } from "../../components/badge";
import { Footer } from "../../components/footer";
import { TitleIcon } from "../../components/titleIcon";
import { Toc } from "../../islands/toc";
import XIcon from "../../islands/x-icon";
import { formattedDate } from "../../lib/date";
import {
    getLatestPostsWithoutTargetPost,
    getPostByEntryName,
    getPosts,
} from "../../lib/posts";
const parser = new Parser(jaModel);

export default createRoute(
    ssgParams(() => {
        const posts = getPosts();
        return posts.map((post) => ({
            slug: post.entryName,
        }));
    }),
    async (c) => {
        const slug = c.req.param("slug");
        if (slug === ":slug") {
            c.status(404);
            return c.text("Not Found");
        }

        const post = getPostByEntryName(slug);
        const pageTitle = post?.frontmatter.title ?? "";
        const date = formattedDate(post?.frontmatter.date ?? "");
        const update = formattedDate(post?.frontmatter.update ?? "");

        const latestPosts = getLatestPostsWithoutTargetPost(
            post?.entryName ?? "",
        );
        const hasLatestPosts = latestPosts.length > 0;
        const splittedTitle = parser.parse(post?.frontmatter.title ?? "");
        const titleLen = pageTitle.length;

        return c.render(
            <div>
                <div class={"flex gap-8 max-md:flex-col"}>
                    <div
                        class={
                            "bg-gray-200 dark:bg-gray-700 py-8 px-4 sm:px-14 sm:rounded-md w-[75%] max-w-[800px] max-md:w-full"
                        }
                    >
                        <div class={"flex mb-10 gap-2 items-center"}>
                            <div class={"max-md:hidden mr-4"}>
                                <TitleIcon
                                    iconUrl={post?.frontmatter.iconUrl ?? ""}
                                />
                            </div>
                            <h1
                                class={`leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex md:auto-phrase ${
                                    titleLen > 20 && "md:w-[90%]"
                                }`}
                            >
                                {splittedTitle}
                            </h1>
                        </div>

                        <article class={"markdown"}>
                            {post?.Component({})}
                        </article>

                        <div
                            class={
                                "mt-10 mb-4 flex items-end justify-center gap-4 flex-wrap max-md:mb-8"
                            }
                        >
                            <a
                                href={`https://x.com/intent/post?url=https://terastech.jp/entry/${
                                    post?.entryName
                                }&text=${post?.frontmatter.title}${" - "}鎌イルカのクラフト記`}
                                target={"_blank"}
                                referrerpolicy="no-referrer"
                                class={
                                    "flex hover:opacity-70 border border-white h-15 w-[217px] rounded-md justify-center items-center transition-opacity"
                                }
                                rel="noreferrer"
                            >
                                <span>この記事をシェアする</span>
                                <span class={"w-6 h-6 ml-4"}>
                                    <XIcon />
                                </span>
                            </a>
                            <a
                                href="https://www.buymeacoffee.com/terastech"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div
                                    class={
                                        "text-xs text-gray-600 dark:text-gray-300 text-center mb-1"
                                    }
                                >
                                    もしよろしければお願いします
                                </div>
                                <img
                                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                                    alt="Buy Me A Coffee"
                                    class={"h-15 w-[217px]"}
                                />
                            </a>
                        </div>

                        {hasLatestPosts && (
                            <div class={"flex flex-col gap-3"}>
                                <p class={"font-bold"}>新着記事</p>
                                <div class={"flex flex-col gap-4"}>
                                    {latestPosts.map((post) => (
                                        <Fragment key={post.entryName}>
                                            <ArticleListItem
                                                entryName={post.entryName}
                                                {...post.frontmatter}
                                            />
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div class={"flex flex-col col-span-2 gap-2 flex-grow"}>
                        <div
                            class={
                                "bg-gray-200 dark:bg-gray-700 py-8 px-8 flex flex-col gap-2 sm:rounded-md"
                            }
                        >
                            <time
                                class={
                                    "flex justify-between flex-wrap basis-4 text-gray-600 dark:text-gray-300 text-base"
                                }
                            >
                                公開日：
                                <span class={"text-right flex-grow"}>
                                    {date}
                                </span>
                            </time>
                            <time
                                class={
                                    "flex justify-between flex-wrap basis-4 text-gray-600 dark:text-gray-300 text-base"
                                }
                            >
                                最終更新日：
                                <span class={"text-right flex-grow"}>
                                    {update}
                                </span>
                            </time>
                            <div class="flex flex-wrap gap-2 mt-2">
                                {post?.frontmatter.tags.map(({ tag, icon }) => {
                                    return (
                                        <a
                                            key={tag}
                                            href={`/?tag=${tag}&icon=${icon}`}
                                        >
                                            <Badge tag={tag} icon={icon}>
                                                {tag}
                                            </Badge>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            class={
                                "bg-gray-200 dark:bg-gray-700 py-8 px-8 rounded-md max-md:hidden"
                            }
                        >
                            <Toc />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>,
            {
                title: pageTitle,
                entryName: slug,
                frontmatter: post?.frontmatter,
            },
        );
    },
);
