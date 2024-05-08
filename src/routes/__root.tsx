import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";
import { SearchComponent } from "../components/SearchComponent";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex justify-center">
        <div className="w-full max-w-screen-md">
          <div className="flex gap-2 text-lg items-center">
            <Link
              to="/"
              activeProps={{
                className: "font-bold",
              }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>{" "}
            <Link
              to={"/search"}
              activeProps={{
                className: "font-bold",
              }}
            >
              Search
            </Link>
            <div className="flex-grow"></div>
            {location.pathname == "/pokemon" && <SearchComponent />}
          </div>
        </div>
      </div>
      <hr />
      <Suspense>
        <Outlet />
      </Suspense>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
