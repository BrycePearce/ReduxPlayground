import "./App.css";

import AddPokemon from "./components/AddPokemon";
import ListPokemon from "./components/ListPokemon";
import { VStack, Heading } from "@chakra-ui/react";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VStack spacing={35}>
          <Heading as="h2" size="2xl">
            Pokedex
          </Heading>
          <AddPokemon />
          <ListPokemon />
        </VStack>
      </header>
    </div>
  );
}

export default App;
