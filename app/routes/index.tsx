import { Fragment } from "hono/jsx/jsx-runtime";
import { createRoute } from "honox/factory";
import { ArticleListItem } from "../components/articleListItem";
import { Badge } from "../components/badge";
import SearchForm from "../islands/searchForm";
import { getLatestPostsWithoutTargetPost, getPosts } from "../lib/posts";
import type { Frontmatter } from "../types/frontmatter";

export default createRoute((c) => {
  const query = c.req.query();
  const posts = getPosts();
  const latestPosts = getLatestPostsWithoutTargetPost("");
  const hasLatestPosts = latestPosts.length > 0;

  const tagMap = new Map<string, { tag: string; icon: string }>();
  for (const { frontmatter: { tags: postTags } } of posts as { frontmatter: Frontmatter }[]) {
    for (const t of postTags ?? []) {
      if (!tagMap.has(t.tag)) tagMap.set(t.tag, t);
    }
  }
  const tags = [...tagMap.values()];

  let filteredPosts = posts;

  if (query.tag) {
    filteredPosts = posts.filter(
      ({ frontmatter: { tags } }: { frontmatter: Frontmatter }) =>
        tags.some(({ tag }: { tag: string }) => tag === query.tag),
    );
  }

  if (query.search) {
    filteredPosts = filteredPosts.filter(
      ({ frontmatter: { title } }: { frontmatter: Frontmatter }) =>
        title.toLowerCase().includes(query.search.toLowerCase()),
    );
  }

  return c.render(
    <div class={"flex gap-14 pt-14 relative max-sm:pt-2"}>
      <div class={"w-full"}>
        {query.tag && (
          <div class={"absolute top-0 left-2"}>
            <a href={"/"}>
              <Badge tag={query.tag} icon={query.icon} viewClose>
                {query.tag}
              </Badge>
            </a>
          </div>
        )}
        {query.search && (
          <div class={"absolute top-0 left-2"}>
            <a href={"/"}>
              <Badge tag={"search"} icon={"search"} viewClose>
                {query.search}
              </Badge>
            </a>
          </div>
        )}
        <div class={"w-full mb-4 block md:hidden"}>
          <a
            href="https://px.a8.net/svt/ejp?a8mat=451DZN+A2L06Q+CO4+3H2BC1"
            rel="nofollow"
          >
            <img
              border="0"
              height="50"
              alt=""
              src="https://www26.a8.net/svt/bgt?aid=250327571609&wid=001&eno=01&mid=s00000001642021006000&mc=1"
            />
          </a>
          <img
            border="0"
            width="1"
            height="1"
            src="https://www14.a8.net/0.gif?a8mat=451DZN+A2L06Q+CO4+3H2BC1"
            alt=""
          />
        </div>
        <div class={"flex-col col-span-2 mb-4 flex md:hidden"}>
          <div
            class={
              "bg-gray-200 dark:bg-gray-700 py-6 px-8 flex flex-col gap-2 sm:rounded-md"
            }
          >
            <p class={"font-bold"}>検索</p>
            <SearchForm value={query.search ?? ""} />
            <div
              class={
                "mt-2 pt-4 border-t text-center gap-y-4 gap-x-2 flex flex-wrap"
              }
            >
              {tags.map(({ tag, icon }) => (
                <a key={tag} href={"/"}>
                  <Badge tag={tag} icon={icon}>
                    {tag}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          class={
            "mb-12 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 max-lg:gap-4"
          }
        >
          {filteredPosts.map((post) => (
            <Fragment key={post.entryName}>
              <ArticleListItem
                {...post.frontmatter}
                entryName={post.entryName}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <div class={"flex-col col-span-2 gap-4 flex max-md:hidden max-w-[280px] shrink-0"}>
        <div class={"flex justify-center items-center p-4"}>
          <div>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=451DZN+A2L06Q+CO4+3H1O6P"
              rel="nofollow"
            >
              <img
                border="0"
                width="300"
                height="250"
                alt=""
                src="https://www29.a8.net/svt/bgt?aid=250327571609&wid=001&eno=01&mid=s00000001642021003000&mc=1"
              />
            </a>
            <img
              border="0"
              width="1"
              height="1"
              src="https://www15.a8.net/0.gif?a8mat=451DZN+A2L06Q+CO4+3H1O6P"
              alt=""
            />
          </div>
        </div>

        <div
          class={
            "bg-gray-200 dark:bg-gray-700 py-8 px-8 flex flex-col gap-2 rounded-md"
          }
        >
          <p class={"font-bold"}>検索</p>
          <SearchForm value={query.search ?? ""} />
          <div class={"mt-2 pt-8 border-t gap-2 text-center flex flex-wrap"}>
            {tags.map(({ tag, icon }) => (
              <a key={tag} href={"/"}>
                <Badge tag={tag} icon={icon}>
                  {tag}
                </Badge>
              </a>
            ))}
          </div>
        </div>
        <div
          class={
            "bg-gray-200 dark:bg-gray-700 p-8 flex flex-col gap-2 rounded-md"
          }
        >
          {hasLatestPosts && (
            <div class={"flex flex-col gap-3"}>
              <p class={"font-bold"}>おすすめ記事</p>
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
      </div>
    </div>,
  );
});
