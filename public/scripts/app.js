import { Search } from "./search.js";
import {Recipe} from "./recipe.js";
import { Ustensils } from "./ustensils.js";
import { Ingredients } from "./ingredients.js";
import { Appliances } from "./appliances.js";

Recipe.displayAllRecipes();
export let search = new Search();
new Ingredients();
new Appliances();
new Ustensils();