import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex justify-center">
        <div className="w-full max-w-screen-md">
          <div className="flex gap-2 text-lg">
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
              to={"/posts"}
              activeProps={{
                className: "font-bold",
              }}
            >
              Posts
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
