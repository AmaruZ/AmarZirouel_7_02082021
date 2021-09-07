import { Recipe } from "./recipe.js";
import { Tag } from "./tag.js";


export class Search{

    constructor(){
        this.inputText = document.querySelector(".search-input");
        this.index = 0;
        this.textLength = 0;
        this.list = [Recipe.allRecipes];
        this.tags = [];
        this.inputText.addEventListener("input", e =>{
            this.searchRecipe(e.target.value);
        });
    }

    get actualList() {
        return [...this.list[this.index]];
    }

    set actualList(list){
        this.list= [...list];
    }

    searchRecipe = (inputTextValue)=>{
        
        if(inputTextValue.length >= 3){
            console.time("algo 2: ");
            if(this.textLength < inputTextValue.length){
                this.index++;
            } else if (this.textLength > inputTextValue.length) this.index--;
            if(this.index <= 0) this.index++;
            this.textLength = inputTextValue.length;
            let list = [...this.list[this.index-1]];
            this.list[this.index] = [];
            Recipe.flushRecipesInDOM();
            for(const recipe of list){
                if((recipe.name.toLowerCase().includes(inputTextValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputTextValue.toLowerCase())) && !this.list[this.index].includes(recipe)){ 
                        this.list[this.index].push(recipe);
                } else {
                    for(const ingredient of recipe.ingredients){
                        if(ingredient.ingredient.toLowerCase().replace(/ /g,'').includes(inputTextValue.toLowerCase().replace(/ /g,'')) && !this.list[this.index].includes(recipe)){
                            this.list[this.index].push(recipe);
                            Recipe.displayRecipe(recipe);
                        }
                    }
                }
            }
            this.filterTag();
            Recipe.displayRecipes(this.list[this.index])
            console.timeEnd("algo 2: ");
        } else{
            this.textLength=0;
            this.index=0;
            this.filterTag();
            Recipe.displayRecipes(this.list[this.index])
        }
        if(this.list[this.index].length === 0){
            Recipe.displayNoRecipes();
        }
    }

    filterTag(){
        if(this.tags.length != 0){
                for(const tag of this.tags){
                    let allRecipes = [...this.list[this.index]];
                    this.list[this.index] = [];
                    for(const recipe of allRecipes){
                        switch(tag.type){
                            case "ingredient":{
                                recipe.ingredients.forEach(ingredient => {
                                    if(ingredient.ingredient.toLowerCase() == tag.name && !this.list[this.index].includes(recipe)){
                                        this.list[this.index].push(recipe);
                                        
                                    }
                                });
                            }
                            break;
                            case "appliance": if(recipe.appliance.toLowerCase() == tag.name && !this.list[this.index].includes(recipe)) this.list[this.index].push(recipe);
                            break;
                            case "ustensil": {
                                recipe.ustensils.forEach(ustensil =>{
                                    if(ustensil.toLowerCase() == tag.name && !this.list[this.index].includes(recipe)) this.list[this.index].push(recipe);
                                });
                            }
                            break;
                        }
                    }
                }
            }
            Recipe.flushRecipesInDOM();
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
        this.list[0] = Recipe.allRecipes;
        this.index--;
        this.searchRecipe(this.inputText.value);
    }
}