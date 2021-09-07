import { Recipe } from "./recipe.js";
import { Tag } from "./tag.js";


export class Search{

    constructor(){
        this.inputText = document.querySelector(".search-input");
        this.list = Recipe.allRecipes;
        this.tags = [];        
        this.inputText.addEventListener("input", e =>{
            this.searchRecipe(e.target.value);
        });
    }

    get actualList() {
        return this.list.slice();
    }

    set actualList(list){
        this.list = list.slice();
    }

    searchRecipe = (inputTextValue)=>{
        if(inputTextValue.length >= 3){
            this.filterTag();
            let list = [...this.list];
            this.list = [];
            Recipe.flushRecipesInDOM();
            for(const recipe of list){
                if(recipe.name.toLowerCase().includes(inputTextValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputTextValue.toLowerCase())){ 
                        this.list.push(recipe);
                        Recipe.displayRecipe(recipe);
                } else {
                    for(const ingredient of recipe.ingredients){
                        if(ingredient.ingredient.toLowerCase().replace(/ /g,'').includes(inputTextValue.toLowerCase().replace(/ /g,'')) && !this.list.includes(recipe)){
                            this.list.push(recipe);
                            Recipe.displayRecipe(recipe);
                        }
                    }
                }
            }
        } else{
            this.filterTag();
        }
        if(this.list.length === 0){
            Recipe.displayNoRecipes();
        }
    }

    filterTag(){
        this.list = Recipe.allRecipes;
        if(this.tags.length != 0){
                for(const tag of this.tags){
                    let allRecipes = [...this.list];
                    this.list = [];
                    for(const recipe of allRecipes){
                        switch(tag.type){
                            case "ingredient":{
                                recipe.ingredients.forEach(ingredient => {
                                    if(ingredient.ingredient.toLowerCase() == tag.name){
                                        this.list.push(recipe);
                                    }
                                });
                            }
                            break;
                            case "appliance": if(recipe.appliance.toLowerCase() == tag.name) this.list.push(recipe);
                            break;
                            case "ustensil": {
                                recipe.ustensils.forEach(ustensil =>{
                                    if(ustensil.toLowerCase() == tag.name) this.list.push(recipe);
                                });
                            }
                        }
                    }
                    allRecipes = [...this.list];
                }
            }
            Recipe.flushRecipesInDOM();
            Recipe.displayRecipes(this.list);
        }

    addTag(type, name){
        new Tag(name, type)
        this.tags.push({name, type});
        this.searchRecipe(this.inputText.value);
    }

    deleteTag(type, name){
        for(let i = this.tags.length - 1; i>=0; i--){
            if(this.tags[i].name == name && this.tags[i].type.match(type)){
                this.tags.splice(i,1);
            }
        }
        this.searchRecipe(this.inputText.value);
    }
}