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
            if(this.textLength < inputTextValue.length){
                this.index++;
            } else if (this.textLength > inputTextValue.length) this.index--;
            this.textLength = inputTextValue.length;
            console.log(this.index)

            let list = [...this.list[this.index-1]];
            this.list[this.index] = [];
            Recipe.flushRecipesInDOM();
            for(const recipe of list){
                if(recipe.name.toLowerCase().includes(inputTextValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputTextValue.toLowerCase())){ 
                        this.list[this.index].push(recipe);
                        // Recipe.displayRecipe(recipe);
                } else {
                    for(const ingredient of recipe.ingredients){
                        if(ingredient.ingredient.includes(inputTextValue)){
                            this.list[this.index].push(recipe);
                            Recipe.displayRecipe(recipe);
                        }
                    }
                }
            }
            this.filterTag();
            Recipe.displayRecipes(this.list[this.index])
        } else{
            this.textLength=0;
            this.index=0;
            this.filterTag();
            Recipe.displayRecipes(this.list[this.index])
            
            //Recipe.flushRecipesInDOM();
            //Recipe.displayRecipes(this.list);
        }
        if(this.list[this.index].length === 0){
            Recipe.displayNoRecipes();
        }
    }

    refreshList(){

        console.log(document.querySelector(".search-input").value);
    }

    filterTag(){

        if(this.tags.length != 0){
                for(const tag of this.tags){
                    let allRecipes = [...this.list[this.index]];
                    this.list[this.index] = [];
                    console.log(tag)
                    for(const recipe of allRecipes){
                        switch(tag.type){
                            case "ingredient":{
                                recipe.ingredients.forEach(ingredient => {
                                    if(ingredient.ingredient.toLowerCase().includes(tag.name) && !this.list[this.index].includes(recipe)){
                                        this.list[this.index].push(recipe);
                                        
                                    }
                                });
                            }
                            break;
                            case "appliance": if(recipe.appliance.toLowerCase().match(tag.name) && !this.list[this.index].includes(recipe)) this.list[this.index].push(recipe);
                            break;
                            case "ustensil": {
                                recipe.ustensils.forEach(ustensil =>{
                                    if(ustensil.toLowerCase().match(tag.name) && !this.list[this.index].includes(recipe)) this.list[this.index].push(recipe);
                                });
                            }
                            break;
                        }
                        
                    }
                }
            }
            Recipe.flushRecipesInDOM();
            
            console.log(this.list,this.index)
            //Recipe.displayRecipes(this.list[this.index]);
        }

    addTag(type, name){
        new Tag(name, type)
        this.tags.push({name, type});
        this.searchRecipe(this.inputText.value);
    }

    deleteTag(type, name){
        for(let i = this.tags.length - 1; i>=0; i--){
            if(this.tags[i].name.match(name) && this.tags[i].type.match(type)){
                this.tags.splice(i,1);
            }
        }
        this.list[0] = Recipe.allRecipes;
        this.searchRecipe(this.inputText.value);
    }
    

}