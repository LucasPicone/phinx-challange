import { FC } from "react";
import { Pokemon } from "../api/pokemon";
import { Card, CardActionArea, CardContent, CardMedia, LinearProgress, Stack, Typography } from "@mui/material";

interface PokemonDetailedCardProps {
    pokemon: Pokemon
}

const PokemonDetailedCard: FC<PokemonDetailedCardProps> = ({ pokemon }) => {
    return (
        <Card sx={{ maxWidth: "250px"}}>
            <CardActionArea>
                <CardMedia
                    component={"img"}
                    image={pokemon.imageUrl}
                    title="image" />
                <CardContent>
                    <Typography variant="h6">{pokemon.name}</Typography>
                </CardContent>
                <Stack spacing={2}>
                    <Typography>HP</Typography>
                    <LinearProgress variant="determinate" color="success" value={(pokemon.hp * 100) / 7}/>
                    <Typography>Attack</Typography>
                    <LinearProgress variant="determinate" color="success" value={(pokemon.attack * 100) / 7}/>
                    <Typography>Defense</Typography>
                    <LinearProgress variant="determinate" color="success" value={(pokemon.defense * 100) / 7}/>
                    <Typography>Speed</Typography>
                    <LinearProgress variant="determinate" color="success" value={(pokemon.speed * 100) / 7}/>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default PokemonDetailedCard;
