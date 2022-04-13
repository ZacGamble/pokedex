
export class Pokemon{
    constructor(data){
        this.name = data.name || ''
        this.nickName = data.nickName || ''
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
        this.user = data.user
    } 
    get ActivePokemon(){
        return /*html*/ `
        <div class="d-flex justify-content-center flex-column">
            <h1>${this.name}</h1>
             <img src="${this.img ? this.img : ''}" alt="pokemon">
          <h3>Weight: ${this.weight}</h3>
          <h3>Height: ${this.height}</h3>
          <h3>Type: ${this.types[0].type.name} ${this.types[1] ? " & " + this.types[1].type.name: '' }</h3>

        </div>
        <div>
        ${this.Buttons}
        </div>
        `
    }
    get Buttons(){
        return `<button class="btn btn-success" onclick="app.myPokemonController.addPokemon()">Add Pokemon</button>`
    }

}