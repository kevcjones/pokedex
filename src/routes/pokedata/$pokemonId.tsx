import { Link, createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../api/api";
import { PokemonPreviewThumbnail } from "../../components/PokemonPreviewThumbnail";

export const Route = createFileRoute("/pokedata/$pokemonId")({
  component: Pokedata,
});

function Pokedata() {
  const { pokemonId } = Route.useParams();

  const [p] = trpc.pokedex.findOne.useSuspenseQuery({
    id: parseInt(pokemonId),
  });

  if (!p) return <p>No pokemon found with ID={pokemonId}</p>;

  const imageUrl = (path: string) => {
    if (!path) return "https://via.placeholder.com/256?text=????";
    return "/api/asset?path=" + path.slice(2);
  };

  return (
    <div className="flex justify-center gap-4">
      <Link
        to="/pokedata/$pokemonId"
        params={{ pokemonId: String(parseInt(pokemonId) - 1) }}
      >
        &lt;
      </Link>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          {" "}
          <img src={imageUrl(p.image.hires)} alt={p.name.english} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{p.name.english}</h2>
          <p>{p.description}</p>
        </div>
      </div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <p>Type: {p.type ? p.type.join(",") : "Unknown"}</p>
          <p>Species: {p.species}</p>
          <p>Height: {p.profile.height}</p>
          <p>Weight: {p.profile.weight}</p>
          <p>Egg: {p.profile.egg ? p.profile.egg.join(",") : "Unknown"}</p>
          {p.base && (
            <>
              <h2 className="card-title">Battle stats</h2>
              <p>Speed: {p.base.Speed}</p>
              <p>Attack: {p.base.Attack}</p>
              <p>Defense: {p.base.Defense}</p>
              <p>Health points: {p.base.HP}</p>
              <p>Special Attack: {p.base["Sp. Attack"]}</p>
              <p>Special Defense: {p.base["Sp. Defense"]}</p>
            </>
          )}
          <h2 className="card-title">Evolutions</h2>
          {p.evolution.prev && (
            <>
              <h3 className="text-lg font-medium">Previous</h3>
              <PokemonPreviewThumbnail
                key={p.evolution.prev[0]}
                pokemonId={p.evolution.prev[0]}
              />
            </>
          )}
          {p.evolution.next && (
            <>
              <h3 className="text-lg font-medium">Next</h3>
              {p.evolution.next?.map(([id]) => (
                <PokemonPreviewThumbnail key={id} pokemonId={id} />
              ))}
            </>
          )}
          {!p.evolution.next?.length && (
            <>
              <h3 className="text-lg font-medium">Next</h3>
              <p>None</p>
            </>
          )}
        </div>
      </div>
      <Link
        to="/pokedata/$pokemonId"
        params={{ pokemonId: String(parseInt(pokemonId) + 1) }}
      >
        &gt;
      </Link>
    </div>
  );
}
