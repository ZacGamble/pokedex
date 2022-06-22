import { ProxyState } from "../AppState.js";
import { apiPokemonService } from "../Services/ApiPokemonService.js";
import { Pop } from "../Utils/Pop.js"


function _drawPokemon() {
    let poke = ProxyState.pokemon;
    let template = ''
    poke.forEach(p => template += /*html*/`<li class="selectable" onclick="app.apiPokemonController.setActivePokemon('${p.name}')">${p.name}</li>`)
    document.getElementById("api-pokemon").innerHTML = template 
}
function _drawActivePokemon(){
    if(!ProxyState.activePokemon) {
        document.getElementById('active-pokemon').innerHTML = ''
    }else{
        document.getElementById('active-pokemon').innerHTML = ProxyState.activePokemon.ActivePokemon
    }
}
export class ApiPokemonController{
constructor(){
    this.getApiPokemon()
   ProxyState.on('pokemon', _drawPokemon) 
   ProxyState.on('activePokemon', _drawActivePokemon)
   ProxyState.on('myPokemon',_drawActivePokemon)
}
async getApiPokemon(){
    try {
        await apiPokemonService.getApiPokemon()
    } catch (error) {
        console.log('could not fetch pokemon');
    }
}
async findPokemon(){
    window.event.preventDefault();
    try {
        let form = window.event?.target
        const formData = {
            name: form.name.value
        }
        console.log(formData);

        await apiPokemonService.findPokemon(formData)
    } catch (error) {
        console.error("SOmething went wrong :/")
    }
}
async setActivePokemon(pokemonIndex){
    try {
    await apiPokemonService.setActivePokemon(pokemonIndex)
    console.log(pokemonIndex);
    } catch (error) {
        Pop.toast(error.message, 'error')
      console.log(error);
    }
}

}