import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSearch } from "../components/SearchQueryProvider";
import { useEffect } from "react";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
});

function SearchComponent() {
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const searchPokemon = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      search: HTMLInputElement;
    };
    setSearchQuery(formElements.search.value);
    navigate({
      to: "/pokemon",
      search: {
        page: 1,
        search: formElements.search.value,
      },
    });
  };

  useEffect(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url(./pokehouse.jpg)",
      }}
    >
      <div className="min-h-screen bg-zinc-900 bg-opacity-80 flex items-center justify-center flex-col">
        <form
          onSubmit={searchPokemon}
          className="w-4/5 md:w-2/3 lg:w-1/3 flex flex-col gap-2"
        >
          <input
            type="text"
            id="search"
            placeholder="Search for a Pokemon..."
            className="input w-full"
          />

          <button type="submit" className="btn btn-primary btn-block">
            Let's go
          </button>
        </form>
      </div>
    </div>
  );
}
