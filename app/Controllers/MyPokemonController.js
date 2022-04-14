import { ProxyState } from "../AppState.js"
import { myPokemonService } from "../Services/MyPokemonService.js";
import { Pop } from "../Utils/Pop.js";

function _drawMyPokemon() {
    let template = ''
    ProxyState.myPokemon.forEach(p => template += /*html*/ `<li class="selectable p-2 border-bottom d-flex justify-content-between" onclick="app.myPokemonController.setActivePokemon('${p.id}')"> ${p.name}<span class="mdi mdi-delete on-hover align-self-end" onclick="app.myPokemonController.removePokemon('${p.id}')"> 
    </li>
    `
    )
    document.getElementById('my-pokemon').innerHTML = template
}
export class MyPokemonController{
constructor(){
    this.getMyPokemon()
    ProxyState.on('pokemon', _drawMyPokemon)
    ProxyState.on('myPokemon', _drawMyPokemon)
    ProxyState.on('activePokemon', _drawMyPokemon)

        }
        setActivePokemon(pokemonId){
            try {
                myPokemonService.setActivePokemon(pokemonId)
            } catch (error) {
                Pop.toast(error.message, 'error')
                console.log(error); 
            }
        }
   async getMyPokemon() {
        try {
            await myPokemonService.getMyPokemon()
        } catch (error) {
           Pop.toast(error.message, 'error')
            console.log(error);
        }
    }
   async addPokemon(){
        try {
            await myPokemonService.addPokemon()
            Pop.toast(` was added!`, 'success')
        } catch (error) {
            Pop.toast(error.message, 'error')
            console.log(error);
        }
    }
    async removePokemon(PokemonId) {
        try {
          const removedPokemon = await myPokemonService.removePokemon(PokemonId)
          Pop.toast(`${removedPokemon.name} has been removed!`, 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
          console.log(error);
        }
      }
 }
