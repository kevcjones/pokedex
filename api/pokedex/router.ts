import { TRPCError } from "@trpc/server";
import { procedure, router } from "../trpc";
import { z } from "zod";

export type PokemonModel = {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: Array<string>;
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
  species: string;
  description: string;
  evolution: {
    next: Array<Array<string>>;
  };
  profile: {
    height: string;
    weight: string;
    egg: Array<string>;
    ability: Array<Array<string>>;
    gender: string;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
  };
};

const publicUrl = (path: string, root: string) => {
  const publicUrl = root;
  if (path.startsWith(".")) path = path.slice(1);
  return `${publicUrl}${path}`;
};

const searchPokemon = (allPokemon: PokemonModel[], search: string) => {
  return allPokemon.filter((pokemon) =>
    pokemon.name.english.toLowerCase().includes(search.toLowerCase())
  );
};

const paginatePokemonResults = (
  allPokemon: PokemonModel[],
  page: number,
  limit: number
) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return allPokemon.slice(start, end);
};

const makePokemonImagesPublic = (pokemon: PokemonModel, root: string) => {
  return {
    ...pokemon,
    image: {
      ...pokemon.image,
      sprite: publicUrl(pokemon.image.sprite, root),
      thumbnail: publicUrl(pokemon.image.thumbnail, root),
      hires: publicUrl(pokemon.image.hires, root),
    },
  };
};

export const pokedexRouter = router({
  find: procedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
        search: z.string(),
      })
    )
    .query(async (req) => {
      const pokedex = await req.ctx.POKEDEX.get("pokedex.json");
      if (!pokedex)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pokedex not found",
        });

      console.log("search", req.input.search);
      const allPokemon = (await pokedex.json()) as PokemonModel[];
      const filteredResults = req.input.search
        ? searchPokemon(allPokemon, req.input.search)
        : allPokemon;
      const paginatedResults = paginatePokemonResults(
        filteredResults,
        req.input.page,
        req.input.limit
      ).map((item) => makePokemonImagesPublic(item, req.ctx.IMG_PUBLIC_URL));

      return {
        pokemon: paginatedResults,
        page: req.input.page,
        limit: req.input.limit,
        total: allPokemon.length,
      };
    }),
});
