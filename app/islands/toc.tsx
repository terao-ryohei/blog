import { useEffect } from "hono/jsx";
import tocbot from "tocbot";

export const Toc = () => {
  useEffect(() => {
    if (!import.meta.env.DEV && import.meta.env.MODE !== "client") return;

    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".markdown",
      headingSelector: "h2, h3",
      scrollSmoothOffset: -10,
      tocScrollingWrapper: null,
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <div>
      <p class="mb-2 pb-1 border-b font-semibold">目次</p>
      <div class="toc" />
    </div>
  );
};
