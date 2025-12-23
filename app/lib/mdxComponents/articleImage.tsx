type Props = {
  src: string;
  alt: string;
};

export const ArticleImage = async (props: Props) => {
  const isFullUrl = props.src.startsWith("http");
  // ここもっといい感じにしたい
  const devImagePath =
    "http://localhost:5173/@fs/Users/Ryohei/Works/develop/workspace/projects/blog/app";
  const imageUrl = import.meta.env.PROD
    ? `/assets/${props.src}`
    : `${devImagePath}/assets/${props.src}`;
  return (
    <figure class="flex justify-center full-width">
      <a href={isFullUrl ? props.src : imageUrl}>
        <img
          class={"object-contain max-h-[500px] max-w-full h-auto w-auto"}
          src={isFullUrl ? props.src : imageUrl}
          loading="lazy"
          alt={props.alt}
          width={"auto"}
          height={"auto"}
        />
      </a>
    </figure>
  );
};
