'use client';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "../api/pokemon";
import { Dispatch, FC, SetStateAction } from "react";

interface PokemonCardProps {
    pokemon: Pokemon
    setSelectedPokemon: Dispatch<SetStateAction<Pokemon | undefined>>
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, setSelectedPokemon }) => {
    return (
        <Card sx={{ maxWidth: "150px"}}>
            <CardActionArea onClick={() => setSelectedPokemon(pokemon)}>
                <CardMedia
                    component={"img"}
                    image={pokemon.imageUrl}
                    title="image" />
                <CardContent>
                    <Typography>{pokemon.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PokemonCard
