import { formattedDate } from "../lib/date";
import type { Frontmatter } from "../types";
import { Badge } from "./badge";

export const ArticleListItem = ({
  tags,
  title,
  date,
  description,
  iconUrl,
  entryName,
}: Frontmatter & { entryName: string }) => {
  return (
    <div
      class={
        "flex flex-col border bg-gray-200 dark:bg-gray-800 dark:border-white border-gray-400 items-center sm:rounded-lg max-sm:border-x-0"
      }
    >
      <a
        class={
          "group py-6 px-4 w-full h-full flex flex-col relative max-sm:flex-row max-sm:items-center"
        }
        href={`/entry/${entryName}`}
      >
        <div class={"flex justify-center"}>
          <div
            class={
              "flex items-center justify-center rounded-xl bg-[#f8f1d4] dark:bg-[#353535] p-4 shrink-0 max-w-20 max-h-20 max-sm:p-2 max-sm:rounded-md"
            }
          >
            <img
              src={iconUrl}
              alt="article icon"
              class={"w-12 h-12 max-sm:w-6 max-sm:h-6"}
            />
          </div>
        </div>
        <h2
          class={
            "text-xl text-center font-semibold mt-4 auto-phrase group-hover:underline max-sm:mt-0 max-md:text-lg max-sm:pl-6"
          }
        >
          {title}
        </h2>
        <div class={"text-end max-sm:absolute max-sm:right-2 max-sm:top-0"}>
          <time
            class={"text-gray-600 dark:text-gray-400 text-sm max-md:text-xs"}
          >
            {formattedDate(date)}
          </time>
        </div>
      </a>
      <div class={"w-full"}>
        <div
          class={
            "flex flex-wrap gap-2 border-t pt-2 px-2 box-content mx-4 mb-4"
          }
        >
          {tags.map(({ tag, icon }) => (
            <a key={tag} href={`/?tag=${tag}&icon=${icon}`}>
              <Badge tag={tag} icon={icon}>
                {tag}
              </Badge>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
