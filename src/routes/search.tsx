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
      <div className="min-h-screen bg-zinc-900 bg-opacity-80"></div>
    </div>
  );
}
