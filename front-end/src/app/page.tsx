import { Box, Container, Grid, Typography } from "@mui/material";
import PokemonCard from "./components/pokemon-card";
import fetchPokemon from "./api/pokemon";

export default async function Home() {

  const pokemons = await fetchPokemon()
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3">Battle of Pokemon</Typography>
        <Typography variant="h5">Select your pokemon</Typography>
        <Grid container direction="row" justifyContent={"space-evenly"}>
          {!!pokemons.length && pokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
