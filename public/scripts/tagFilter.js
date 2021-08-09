import { displayRecipes } from "./app.js";

export class TagFilter{

    static init = () =>{
        new TagFilter;
    }

    constructor(){
        this.recipeFiltered = [];
    }

    static addFilter = (tag, type) =>{
        let tagFiltered = [];
        
        switch (type){
            case 0: {
                recipes.forEach(recipe =>{
                    recipe.ingredients.forEach(ingredient =>{
                        if(ingredient.ingredient.toLowerCase().match(tag)){
                            tagFiltered.push(recipe);
                        }
                    })
                })
            }
            break;
            case 1: {
                recipes.forEach(recipe =>{
                    if(recipe.appliance.toLowerCase().match(tag)) tagFiltered.push(recipe);
                })
            }
            break;
            case 2: {
                recipes.forEach(recipe =>{
                    recipe.ustensils.forEach(ustensil =>{
                        if(ustensil.toLowerCase().match(tag)){
                            tagFiltered.push(recipe);
                        }
                    })
                })
            }
            break;
        }
        console.log(this.recipeFiltered);
        document.querySelector(".container").innerHTML = "";
        tagFiltered.forEach(recipe => displayRecipes(recipe));
    }
}