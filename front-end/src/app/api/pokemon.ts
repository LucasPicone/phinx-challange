import axios from "axios"

export enum PokemonType {
    NORMAL = 'NORMAL',
    FIRE = 'FIRE',
    WATER = 'WATER',
    ELECTRIC = 'ELECTRIC',
    GRASS = 'GRASS',
    ICE = 'ICE',
    FIGHTING = 'FIGHTING',
    POISON = 'POISON',
    GROUND = 'GROUND',
    FLYING = 'FLYING',
    PSYCHIC = 'PSYCHIC',
    BUG = 'BUG',
    ROCK = 'ROCK',
    GHOST = 'GHOST',
    DRAGON = 'DRAGON',
    DARK = 'DARK',
    STEEL = 'STEEL',
    FAIRY = 'FAIRY',
}

export interface Pokemon {
    id: string
    name: string,
    attack: number,
    defense: number,
    hp: number,
    speed: number,
    type: PokemonType,
    imageUrl: string
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const fetchPokemon = async () => {
    try {
        const { data }: { data: Pokemon[] } = await axiosInstance('/pokemon');
        return data
    } catch (error) {
        console.error('Error on Backend:', error)
        throw new Error('Could not get data')
    }
}

export default fetchPokemon