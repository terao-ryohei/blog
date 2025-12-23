import type { JSX } from "hono/jsx/jsx-runtime";

export const Badge = ({
  icon,
  children,
  tag,
  viewClose,
}: JSX.ElementChildrenAttribute & {
  icon: string;
  tag: string;
  viewClose?: boolean;
}) => {
  return (
    <div
      className={
        "inline-flex items-center gap-2 bg-card py-1 px-2 border rounded-full w-auto hover:opacity-70"
      }
    >
      {icon && (
        <div class="place-items-center grid w-3 h-3">
          <img
            src={icon === "search" ? "/article-icons/search.webp" : icon}
            alt={tag}
          />
        </div>
      )}
      <span className="font-semibold text-sm">{children}</span>
      {viewClose && <span>×</span>}
    </div>
  );
};
