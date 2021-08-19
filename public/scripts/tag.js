import { displayRecipes, flushRecipesInDOM } from "./app.js";

export class Tag{

    static init(tag, type){
        new Tag(tag,type);
    }

    constructor(tag, type){
        this.tag = tag;
        this.type = type;
        this.container = document.querySelector(".container__tags");
        this.addTag();

    }

    addTag = () =>{
        const element = document.createElement("span");
        element.classList.add("text-white","rounded", "tag");
        switch(this.type){
            case 0: element.classList.add("bg-primary");
            break;
            case 1: element.classList.add("bg-success");
            break;
            case 2: element.classList.add("bg-danger");
            break; 
        }
        element.innerHTML = `<span class="tag__text">${this.tag}</span><i class="bi bi-x-circle"></i>`;
        this.container.appendChild(element);
        this.filterByTags();
        element.addEventListener("click", e =>{
            this.deleteTag(element);
        });
    }

    deleteTag = tag =>{
        this.container.removeChild(tag);
        this.filterByTags();
    }

    filterByTags = () =>{
        let recipeFiltered = recipes;
        
        const tags = this.container.querySelectorAll(".tag");
        if(tags.length == 0) {
            flushRecipesInDOM();
            for(let i=0; i< recipes.length; i++){
                displayRecipes(recipes[i]);
            }
        } else {
            tags.forEach(tag =>{
                let recipeFilter = [];
                if(tag.classList.contains("bg-primary")){
                    recipeFiltered.forEach(recipe =>{
                        recipe.ingredients.forEach(ingredient =>{
                            if(ingredient.ingredient.toLowerCase().match(tag.innerText)){
                                recipeFilter.push(recipe);
                            }
                        })
                    })
                }
                if(tag.classList.contains("bg-success")){
                    recipeFiltered.forEach(recipe =>{
                        if(recipe.appliance.toLowerCase().match(tag.innerText)){
                            recipeFilter.push(recipe);
                        }
                    })
                }
                if(tag.classList.contains("bg-danger")){
                    recipeFiltered.forEach(recipe =>{
                        recipe.ustensils.forEach(ustensil =>{
                            if(ustensil.toLowerCase().match(tag.innerText)){
                                recipeFilter.push(recipe);
                            }
                        })
                    })
                }
                recipeFiltered = recipeFilter;
                flushRecipesInDOM();
                recipeFiltered.forEach(recipe => displayRecipes(recipe));
            })
        }
        
    }
}