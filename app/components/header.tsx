import type { JSX } from "hono/jsx/jsx-runtime";
import { blogName } from "../constants";
import GithubIcon from "../islands/github-icon";
import QiitaIcon from "../islands/qiita-icon";
import XIcon from "../islands/x-icon";

type Props = {
  children: JSX.Element;
};
export const Header = (props: Props) => {
  return (
    <header
      class={
        "text-center border-b px-4 mx-2 max-md:px-2 z-99999 bg-primary dark:border-gray-500 w-full h-16 tracking-widest dark:text-gray-100 flex justify-between items-center fixed"
      }
    >
      <a href="/" class={"flex gap-4 items-center"}>
        <img class={"w-10"} src="/icon.png" alt="logo" />
        <h2
          class={
            "font-semibold text-center text-2xl !text-white max-md:text-xl max-sm:hidden"
          }
        >
          {blogName}
        </h2>
      </a>
      <div class={"flex justify-center items-center gap-4"}>
        <a
          href="https://x.com/system_dolphin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="flex justify-center items-center hover:opacity-70 rounded-xl w-5 h-5 dark:text-white transition-opacity"
            type="button"
          >
            <XIcon />
          </button>
        </a>
        <a
          href="https://github.com/terao-ryohei"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="flex justify-center items-center hover:opacity-70 rounded-xl w-6 h-6 dark:text-white transition-opacity"
            type="button"
          >
            <GithubIcon />
          </button>
        </a>
        <a
          href="https://qiita.com/r-terao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="flex justify-center items-center hover:opacity-70 rounded-xl w-6 h-6 dark:text-white transition-opacity"
            type="button"
          >
            <QiitaIcon />
          </button>
        </a>
        <div class="ml-2">{props.children}</div>
      </div>
    </header>
  );
};
