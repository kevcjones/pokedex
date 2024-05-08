import { pokedexRouter } from "./pokedex/router";
import { postsRouter } from "./posts/router";
import { router } from "./trpc";

export const appRouter = router({
  posts: postsRouter,
  pokedex: pokedexRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
