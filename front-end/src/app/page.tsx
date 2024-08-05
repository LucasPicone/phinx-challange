'use client'
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import fetchPokemon, { Pokemon } from "./api/pokemon";
import PokemonList from "./components/pokemon-list";
import { Fragment, useEffect, useState } from "react";
import PokemonDetailedCard from "./components/pokemon-detailed-card";
import pokemonBattle, { Battle } from "./api/battle";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()
  const [rival, setRival] = useState<Pokemon>()
  const [battleResult, setBattleResult] = useState<Battle>()

  useEffect(() => {
    async function fetch() {
      const pokemons = await fetchPokemon()
      setPokemons(pokemons)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (selectedPokemon) {
      const filteredPokemons = pokemons.filter(p => p.id !== selectedPokemon.id)
      const rivalIdx: number = Math.floor(Math.random() * (filteredPokemons.length))
      setRival(filteredPokemons[rivalIdx])
      setBattleResult(undefined)
    }
  }, [selectedPokemon, pokemons])

  const fight = async () => {
    if (selectedPokemon && rival) {
      const battle = await pokemonBattle(selectedPokemon.id, rival.id)
      setBattleResult(battle)
    }
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
        gap={2}
      >
        <Typography variant="h3">Battle of Pokemon</Typography>
        <Typography variant="h5">Select your pokemon</Typography>
        <PokemonList pokemons={pokemons} setSelectedPokemon={setSelectedPokemon} />

        {!!battleResult && (
          <Box sx={{ bgcolor: "lightblue", m: 2, p: 2, border: 1 }} boxShadow={3}>
            <Typography variant="h5">{battleResult.winner.name} wins!</Typography>
          </Box>
        )}

        <Grid container direction="row" justifyContent={"space-evenly"} alignItems={"center"}>
          {!!selectedPokemon && !!rival && (
            <Fragment>
              <PokemonDetailedCard pokemon={selectedPokemon} />
              <Button color="success" variant="contained" sx={{maxHeight: '50px'}} onClick={fight}>Start Battle</Button>
              <PokemonDetailedCard pokemon={rival} />
            </Fragment>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
