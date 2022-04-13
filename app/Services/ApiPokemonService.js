import { ProxyState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";
import { pokeApi } from "./AxiosService.js";

class ApiPokemonService{
  async setActivePokemon(pokemonIndex) {
       const res = await pokeApi.get('pokemon/' + pokemonIndex)
       console.log('hi from API Pokemon service', res.data);
       ProxyState.activePokemon = new Pokemon(res.data)
   }
   async getApiPokemon() {
       // @ts-ignore
       const res = await pokeApi.get('pokemon')
       ProxyState.pokemon = res.data.results
    }

} 

export const apiPokemonService = new ApiPokemonService()