import { RouterProvider, createRouter } from "@tanstack/react-router";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { routeTree } from "../routeTree.gen";
import { ApiProvider } from "../api/ApiProvider";
import { SearchProvider } from "./SearchQueryProvider";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppProvider: FC = () => {
  return (
    <ErrorBoundary fallback={<div>On no!</div>}>
      <ApiProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </ApiProvider>
    </ErrorBoundary>
  );
};
