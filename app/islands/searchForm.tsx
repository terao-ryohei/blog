import { useState } from "hono/jsx";

export default function SearchForm({ value }: { value: string }) {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setSearchValue(e.target?.value);
    }
  };

  return (
    <div class="flex gap-2 mb-3">
      <input
        onChange={onChange}
        class={
          "rounded-md py-1 px-2 text-gray-900 bg-gray-50 w-full dark:bg-gray-300"
        }
        value={value}
      />
      <a href={`/?search=${searchValue}`}>
        <button
          type="button"
          class={
            "text-nowrap font-bold bg-gray-400 dark:bg-gray-800 py-1 px-2 rounded-sm"
          }
        >
          検索
        </button>
      </a>
    </div>
  );
}
