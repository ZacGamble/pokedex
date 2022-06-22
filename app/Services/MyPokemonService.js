import { ProxyState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";
import { sandboxApi } from "./AxiosService.js"

class MyPokemonService{
  async addPokemon() {
        const foundPokemon = ProxyState.myPokemon.find(p => p.name == ProxyState.activePokemon?.name)
        if(!foundPokemon){
            window.alert('you already have found this pokemon!')
            return
        }
         const res = await sandboxApi.post('zac/pokemon/', ProxyState.activePokemon)
        ProxyState.myPokemon = [...ProxyState.myPokemon, new Pokemon(res.data)]
    }
    setActivePokemon(pokemonId) {
        const activePokemon = ProxyState.myPokemon.find(p => p.id == pokemonId)
        ProxyState.activePokemon = activePokemon
        
    }
    async removePokemon(pokemonId) {
        await sandboxApi.delete('zac/pokemon/' + pokemonId)
        // NOTE this is for the toast notification in the controller
        const foundPokemon = ProxyState.myPokemon.find(p => p.id == pokemonId)
        const index = ProxyState.myPokemon.findIndex(p => p.id == pokemonId)
        ProxyState.myPokemon.splice(index, 1)
        return foundPokemon //returns the pokemon so my controller can ID it
      }
    async getMyPokemon() {
        const res = await sandboxApi.get('zac/pokemon/')
        console.log(res.data, 'hi from My pokemon Service');
        ProxyState.myPokemon = res.data.map(p => new Pokemon(p))
    }


}

export const myPokemonService = new MyPokemonService()