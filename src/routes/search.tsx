import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
});

function SearchComponent() {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url(./pokehouse.jpg)",
      }}
    >
      <div className="min-h-screen bg-zinc-900 bg-opacity-80 flex items-center justify-center flex-col">
        <div className="w-4/5 md:w-2/3 lg:w-1/3 flex flex-col gap-2">
          <input
            type="text"
            id="search"
            placeholder="Search for a Pokemon..."
            className="input w-full"
          />
          <button className="btn btn-primary btn-block">Let's go</button>
        </div>
      </div>
    </div>
  );
}
