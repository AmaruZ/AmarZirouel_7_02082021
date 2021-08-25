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
        return this.list;
    }

    set actualList(list){
        this.list = list;
    }

    searchRecipe = (inputTextValue)=>{
        
        if(inputTextValue.length >= 3){
            this.filterTag();
            let list = this.list;
            this.list = [];
            Recipe.flushRecipesInDOM();
            list.forEach(recipe => {
                if(recipe.name.toLowerCase().includes(inputTextValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputTextValue.toLowerCase())){ 
                        this.list.push(recipe);
                        Recipe.displayRecipe(recipe);
                } else {
                    recipe.ingredients.forEach(ingredient =>{
                        if(ingredient.ingredient.includes(inputTextValue)){
                            this.list.push(recipe);
                            Recipe.displayRecipe(recipe);
                        }
                    })
                }
                
            })
        } else{
            this.filterTag();
            Recipe.flushRecipesInDOM();
            Recipe.displayRecipes(this.list);
        }
        if(this.list.length === 0){
            Recipe.displayNoRecipes();
        }
    }

    refreshList(){

        console.log(document.querySelector(".search-input").value);
    }

    filterTag(){
        this.list = Recipe.allRecipes;
        if(this.tags.length != 0){
                this.tags.forEach(tag =>{
                    let allRecipes = this.list;
                    this.list = [];
                    switch(tag.type){
                        case "ingredient":{
                            allRecipes.forEach(recipe =>{
                                recipe.ingredients.forEach(ingredient => {
                                    if(ingredient.ingredient.toLowerCase().match(tag.name)){
                                        this.list.push(recipe);
                                    }
                                });
                            });
                        }
                        break;
                        case "appliance": {
                            allRecipes.forEach(recipe =>{
                                if(recipe.appliance.toLowerCase().match(tag.name)) this.list.push(recipe);
                            });
                        }
                        break;
                        case "ustensil": {
                            allRecipes.forEach(recipe =>{
                                recipe.ustensils.forEach(ustensil =>{
                                    if(ustensil.toLowerCase().match(tag.name)) this.list.push(recipe);
                                });
                            });
                        }
                    }
                    allRecipes = this.list;
                });
                
            }

            Recipe.flushRecipesInDOM();
            Recipe.displayRecipes(this.list);
        }

    addTag(type, name){
        new Tag(name, type)
        this.tags.push({name, type});
        
        //this.filterTag();
        this.searchRecipe(this.inputText.value);
        console.log(this.tags)
    }

    deleteTag(type, name){
        for(let i = this.tags.length - 1; i>=0; i--){
            console.log(this.tags[i].name, name, this.tags[i].type, type)
            if(this.tags[i].name.match(name) && this.tags[i].type.match(type)){
                this.tags.splice(i,1);
            }
        }
        //this.filterTag();
        this.searchRecipe(this.inputText.value);
        console.log(this.tags);
    }
    

}