'use client';

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Pokemon } from "../api/pokemon";
import { Grid } from "@mui/material";
import PokemonCard from "./pokemon-card";

interface PokemonListProps {
    pokemons: Pokemon[],
    setSelectedPokemon: Dispatch<SetStateAction<Pokemon | undefined>>
}

const PokemonList: FC<PokemonListProps> = ({ pokemons, setSelectedPokemon }) => {
    return (
        <Grid container direction="row" justifyContent={"space-evenly"}>
          {!!pokemons.length && pokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} setSelectedPokemon={setSelectedPokemon}/>
          ))}
        </Grid>
    )
}

export default PokemonList;
