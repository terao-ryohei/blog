export default function GithubIcon() {
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
    src="/brand-icons/github-mark-white.png"
    alt="x account link"
  />
);

const LightIcon = () => (
  <img
    class="dark:hidden block w-full h-full"
    src="/brand-icons/github-mark.png"
    alt="x account link"
  />
);
