import { displayAllRecipes, displayRecipes, flushRecipesInDOM } from "./app.js";

export class Search{

    constructor(){
        this.inputText = document.querySelector(".search-input");
        this.list = recipes;
        this.setList = function(list) { _list = list;}
        this.getList = function() {return _list;}
        this.inputText.addEventListener("input", e =>{
            this.searchRecipe(e);
        });
    }

    searchRecipe = (event)=>{
        if(event.target.value.length >= 3){
            let list = recipes;
            this.list = [];
            flushRecipesInDOM();
            list.forEach(recipe => {
                if(recipe.name.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.description.toLowerCase().includes(event.target.value.toLowerCase())){
                    this.list.push(recipe);
                    displayRecipes(recipe);
                } else {
                    recipe.ingredients.forEach(ingredient =>{
                        if(ingredient.ingredient.includes(event.target.value)){
                            this.list.push(recipe);
                            displayRecipes(recipe);
                        }
                    })
                }
                
            })
        } else{
            this.list = recipes;
            flushRecipesInDOM();
            displayAllRecipes();
        }
        if(this.list.length === 0){
            this.displayNoRecipes();
        }

    }

    displayNoRecipes = () =>{
        const container = document.querySelector(".container");
        container.innerHTML=`
                            <p> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
                            
                            `
    }


    get recipesList(){
        return this.list;
    }



}