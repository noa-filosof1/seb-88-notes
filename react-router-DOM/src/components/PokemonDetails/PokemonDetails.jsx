import { useParams } from "react-router";

const PokemonDetails = (props) => {
  const { pokemonId } = useParams();
  console.log('use params pokemon ID', pokemonId);
  console.log('props', props);
  const individualPoke = props.pokemon.find((poke) => (
    poke._id === Number(pokemonId)
  ));
  console.log('individual poke', individualPoke);
  return (
    <>
    <h2>Pokemon Details for {individualPoke.name}</h2>
      <dl>
        <dt>Weight:</dt>
        <dd>{individualPoke.weight}</dd>
        <dt>Height:</dt>
        <dd>{individualPoke.height}</dd>
      </dl>
    </>
  )
}

export default PokemonDetails;