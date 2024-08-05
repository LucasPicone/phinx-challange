import axios from "axios"
import { Pokemon } from "./pokemon"

export interface Battle {
    id?: number
    winner: Pokemon
    loser: Pokemon
    turnAmount: number
}

const axiosInstance = axios.create({
    baseURL: 'http:localhost:8080/api'
})

const pokemonBattle = async (firstPokemonId: string, secondPokemonId: string) => {
    try {
        const { data }: { data: Battle } = await axiosInstance.post('/battle', {
            firstFighter: firstPokemonId,
            secondFighter: secondPokemonId
        })
        return data
    } catch (error) {
        console.error('Error on Backend:', error)
        throw new Error('Could not create battle')
    }
}

export default pokemonBattle;
