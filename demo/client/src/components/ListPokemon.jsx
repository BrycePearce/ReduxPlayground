import { UnorderedList, ListItem } from "@chakra-ui/react";
import { usePokemonList } from "../hooks/useQueries";
const ListPokemon = () => {
  const { data, isLoading, isSuccess, isError, error } = usePokemonList();
  return (
    <UnorderedList>
      {data.length > 0 &&
        data.map((pokemon) => (
          <ListItem key={pokemon.id}>{pokemon.name}</ListItem>
        ))}
    </UnorderedList>
  );
};

export default ListPokemon;
