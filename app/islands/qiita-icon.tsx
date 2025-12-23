export default function QiitaIcon() {
  return (
    <span class="flex justify-center items-center hover:opacity-70 rounded-md w-full h-full dark:text-white transition-opacity">
      <LightIcon />
      <DarkIcon />
    </span>
  );
}

const DarkIcon = () => (
  <img
    class="hidden dark:block w-full h-full"
    src="/brand-icons/qiita-icon.png"
    alt="x account link"
  />
);

const LightIcon = () => (
  <img
    class="dark:hidden block w-full h-full"
    src="/brand-icons/qiita-icon.png"
    alt="x account link"
  />
);
