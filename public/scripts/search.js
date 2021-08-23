import { Recipe } from "./recipe.js";


export class Search{

    constructor(){
        this.inputText = document.querySelector(".search-input");
        this.list = Recipe.allRecipes;        
        this.inputText.addEventListener("input", e =>{
            this.searchRecipe(e);
        });
    }

    get actualList() {
        return this.list;
    }

    set actualList(list){
        this.list = list;
    }

    searchRecipe = (event)=>{
        if(event.target.value.length >= 3){
            let list = Recipe.allRecipes;
            this.list = [];
            Recipe.flushRecipesInDOM();
            list.forEach(recipe => {
                if(recipe.name.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.description.toLowerCase().includes(event.target.value.toLowerCase())){
                    this.list.push(recipe);
                    Recipe.displayRecipe(recipe);
                } else {
                    recipe.ingredients.forEach(ingredient =>{
                        if(ingredient.ingredient.includes(event.target.value)){
                            this.list.push(recipe);
                            Recipe.displayRecipe(recipe);
                        }
                    })
                }
                
            })
        } else{
            this.list = Recipe.allRecipes;
            Recipe.flushRecipesInDOM();
            Recipe.displayAllRecipes();
        }
        if(this.list.length === 0){
            Recipe.displayNoRecipes();
        }
    }


}