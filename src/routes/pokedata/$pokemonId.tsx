import { createFileRoute } from "@tanstack/react-router";
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

  const imageUrl = (path: string) => {
    return "/api/asset?path=" + path.slice(2);
  };

  return (
    <div className="flex justify-center gap-4">
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
          <p>Type: {p.type.join(",")}</p>
          <p>Species: {p.species}</p>
          <p>Height: {p.profile.height}</p>
          <p>Weight: {p.profile.weight}</p>
          <p>Egg: {p.profile.egg.join(",")}</p>
          <h2 className="card-title">Battle stats</h2>
          <p>Speed: {p.base.Speed}</p>
          <p>Attack: {p.base.Attack}</p>
          <p>Defense: {p.base.Defense}</p>
          <p>Health points: {p.base.HP}</p>
          <p>Special Attack: {p.base["Sp. Attack"]}</p>
          <p>Special Defense: {p.base["Sp. Defense"]}</p>
          <h2 className="card-title">Evolutions</h2>
          {p.evolution.next?.map(([id, name]) => (
            <>
              <h3>{name}</h3>
              <PokemonPreviewThumbnail key={id} pokemonId={id} />
            </>
          ))}
          {!p.evolution.next?.length && <p>None</p>}
        </div>
      </div>
    </div>
  );
}
