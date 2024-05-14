import { Link } from "@tanstack/react-router";
import { trpc } from "../api/api";

type PokemonPreviewThumbnailProps = {
  pokemonId: string;
};
export function PokemonPreviewThumbnail({
  pokemonId,
}: PokemonPreviewThumbnailProps) {
  const imageUrl = (path: string) => {
    return "/api/asset?path=" + path.slice(2);
  };

  const [p] = trpc.pokedex.findOne.useSuspenseQuery({
    id: parseInt(pokemonId, 10),
  });
  return (
    <Link to={`/pokedata/${pokemonId}`}>
      <img src={imageUrl(p.image.thumbnail)} alt={p.name.english} />
    </Link>
  );
}
