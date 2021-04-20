import { useState } from "react";
import {
  Container,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useAddPokemon } from "../hooks/mutations/pokemonMutations";

const AddPokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const addPokemon = useAddPokemon();

  return (
    <Container maxW="container.md">
      <InputGroup>
        <Input
          pr="4.5rem"
          type="text"
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            backgroundColor="teal.500"
            onClick={() =>
              addPokemon.mutateAsync({
                name: pokemonName,
                avatar: "http://placekitten.com/48/48",
                id: Math.random(),
              })
            }
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </Container>
  );
};

export default AddPokemon;
