import { SimpleGrid, Box, Avatar } from "@chakra-ui/react";
import { usePokemonList } from "../hooks/useQueries";
const ListPokemon = () => {
  const { data, isLoading, isSuccess, isError, error } = usePokemonList();
  console.log(data);
  return (
    <SimpleGrid minChildWidth="18rem" spacing="40px" width="75%">
      {data.length > 0 &&
        data.map((pokemon) => (
          <Box
            key={pokemon.id}
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            border="1px"
            borderColor="whiteAlpha.900"
            borderRadius="2rem"
            height="5rem"
          >
            <Avatar
              name="Dan Abrahmov"
              src={pokemon.avatar}
              background="transparent"
            />
            <span>{pokemon.name}</span>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ListPokemon;
