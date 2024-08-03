import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "../api/pokemon";
import { FC } from "react";

interface PokemonCardProps {
    pokemon: Pokemon
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <Card sx={{ maxWidth: "150px"}}>
            <CardActionArea>
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
