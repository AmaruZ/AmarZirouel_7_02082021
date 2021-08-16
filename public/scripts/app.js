import { Appliances } from "./appliances.js";
import { Ingredients } from "./ingredients.js";
import { TagFilter } from "./tagFilter.js";
import { Ustensils } from "./ustensils.js";

const recipesContainer = document.querySelector(".container");

export const flushRecipesInDOM =() =>{
    recipesContainer.innerHTML = ``;
}
export const displayRecipes = recipe =>{
        recipesContainer.innerHTML += `     
            <article class="col-12 col-md-6 col-lg-4 g-3 mb-2">
                <div class="card p-0">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="178" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#C7BEBE"></rect></svg>
                        <div class="card-body row g-0">
                            <div class="d-flex justify-content-between align-items-center col-12">
                                <h2 class="card-title h2">${recipe.name}</h2>
                                <p class="card-text text-nowrap h4"><i class="bi bi-clock h4"></i> ${recipe.time} min</p>
                            </div>
                            <div class="card-text col-6">${putIngredientsInList(recipe.ingredients)}</div>
                            <p class="card-text col card__description text-truncate h6">${recipe.description}</p>
                        </div>
                </div>
            </article>
                                        `;
    
}

const putIngredientsInList= ingredients =>{
    let result = `<ul>`;
    for(let i=0; i< ingredients.length; i++){
        if(ingredients[i].quantity!= undefined && ingredients[i].unit != undefined){
            result+= `<li><span class="h5">${ingredients[i].ingredient}:</span><span class="h6"> ${ingredients[i].quantity}${ingredients[i].unit}</span></li>`;
        } else if(ingredients[i].quantity!= undefined){
            result+= `<li><span class="h5">${ingredients[i].ingredient}:</span><span class="h6"> ${ingredients[i].quantity}</span></li>`;
        } else {
            result += `<li><span class="h5">${ingredients[i].ingredient}</span></li>`;
        }
    }
    result += `</ul>`;
    return result;
}

for(let i=0; i< recipes.length; i++){
    displayRecipes(recipes[i]);
}
TagFilter.init();
Ingredients.init();
Appliances.init();
Ustensils.init();
