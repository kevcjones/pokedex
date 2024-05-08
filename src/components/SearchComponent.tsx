import { useEffect, useMemo } from "react";
import { useSearch } from "./SearchQueryProvider";

export function SearchComponent() {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
  }, [searchParams, setSearchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    history.pushState({}, "", `/pokemon?page=1&search=${e.target.value}`);
  };

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a Pokemon..."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
