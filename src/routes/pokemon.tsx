import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { trpc } from "../api/api";
import { z } from "zod";
import { useSearch } from "../components/SearchQueryProvider";

// Schema to validate the search query params and remedy them if needed
const pokemonSearchShema = z.object({
  page: z.number().catch(1),
  search: z.string().catch(""),
});
type PokemonSearch = z.infer<typeof pokemonSearchShema>;

export const Route = createFileRoute("/pokemon")({
  component: PokemonComponent,
  errorComponent: () => "Oh crap!",
  validateSearch: (search: Record<string, string>): PokemonSearch => {
    return {
      page: Number(search.page) || 1,
      search: search.search || "",
    };
  },
});

function PokemonComponent() {
  const { page: searchPage, search } = Route.useSearch();

  const [page, setPage] = useState(searchPage);
  const { searchQuery } = useSearch();

  const [allPokemonQuery] = trpc.pokedex.find.useSuspenseQuery({
    search: searchQuery,
    page,
    limit: 10,
  });

  const handleNextPage = () => {
    history.pushState(
      {},
      "",
      `/pokemon?page=${page + 1}&search=${searchQuery}`
    );
    setPage(page + 1);
  };

  return (
    <div>
      <div className="p-2 flex justify-center">
        <div className="w-full max-w-screen-md flex flex-col itwwems-start gap-2">
          {searchQuery && (
            <h3 className="text-2xl">
              Pokemon {search && <span> matching "{searchQuery}"</span>}
            </h3>
          )}

          <ul className="self-stretch">
            {allPokemonQuery.pokemon.map((p) => (
              <li key={p.id}>
                <div className="rounded-md border-2 p-2">
                  <div className="flex justify-between">
                    <img src={p.image.sprite} alt={p.name.english} />
                    <h3 className="text-xl">{p.name.english}</h3>
                    <div>ID: {p.id}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleNextPage} className="btn">
            Next page
          </button>
        </div>
      </div>
    </div>
  );
}
