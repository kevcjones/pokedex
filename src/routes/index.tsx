import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(./pokehouse.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hey Harrison</h1>
          <p className="mb-5">
            Welcome to the Pokehouse. An encyclopedia of Pokemon at your
            disposal where you can search for your favorite Pokemon and learn
            more about them.
          </p>
          <Link to="/search" className="btn btn-primary">
            Find Pokemon
          </Link>
        </div>
      </div>
    </div>
  );
}
