const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;
import * as pokemon from './pokemon.json';

app.use(cors())
app.use(express.json())


app.get('/pokemonList', (_: any, res: any) => res.json(pokemon));

app.post('/addPokemon', (req: any, res: any) => {
    pokemon.push(req.body.newPokemon);
    return res.status(200).send({ pokemon: req.body.newPokemon });
});

app.listen(port, () => {
    console.log(`⚡️Server is running at https://localhost:${port}`);
});