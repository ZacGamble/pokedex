import { ApiPokemonController } from "./Controllers/ApiPokemonController.js";
import { MyPokemonController } from "./Controllers/MyPokemonController.js";


class App {
  // valuesController = new ValuesController();
  apiPokemonController = new ApiPokemonController();
  myPokemonController = new MyPokemonController();
}

window["app"] = new App();
