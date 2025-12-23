import image from "../assets/avatar.webp?url";
import GithubIcon from "../islands/github-icon";
import QiitaIcon from "../islands/qiita-icon";
import XIcon from "../islands/x-icon";
import { Avatar } from "./avatar";
export const Profile = () => {
  return (
    <div
      class={
        "border border-gray-300 dark:border-gray-600 rounded-3xl flex p-6 my-10 gap-6 items-center dark:text-gray-100"
      }
    >
      {import.meta.env.PROD ? (
        <Avatar src="/assets/avatar.webp" />
      ) : (
        <Avatar src={image} />
      )}
      <div class={"flex flex-col gap-3"}>
        <div class="flex gap-2">
          <span class={"font-bold"}>鎌イルカ</span>
          <span class={"text-gray-500 dark:text-gray-200"}>
            @system_dolphin
          </span>
        </div>
        <p class={"text-sm"}>
          WEBアプリ開発とマイクラ内ゲーム開発を中心にエンジニア体験をクラフトしています
          <br />
          名の通りにカマイルカが好きです、イルカショーは江ノ水推し。
        </p>
        <div class={"flex gap-2 items-center"}>
          <a
            class={"w-5 h-5"}
            href="https://x.com/system_dolphin"
            target="_blank"
            rel="noreferrer"
          >
            <XIcon />
          </a>
          <a
            class={"w-5 h-5"}
            href="https://github.com/terao-ryohei"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            class={"w-5 h-5"}
            href="https://qiita.com/r-terao"
            target="_blank"
            rel="noreferrer"
          >
            <QiitaIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
