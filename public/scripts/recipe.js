export class Recipe {


    static get allRecipes(){
        return [...recipes];
    }

    static displayAllRecipes = () =>{
        for(let i=0; i< recipes.length; i++){
            this.displayRecipe(recipes[i]);
        }
    }

    static displayRecipes = recipeList =>{
        for(let i=0; i<recipeList.length; i++){
            this.displayRecipe(recipeList[i]);
        }
    }

    static displayRecipe = recipe => {
        document.querySelector(".container").innerHTML += `     
        <article class="col-12 col-md-6 col-lg-4 gx-5 gy-4 mb-2">
            <div class="card p-0">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="178" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#C7BEBE"></rect></svg>
                    <div class="card-body row g-0">
                        <div class="d-flex justify-content-between align-items-center col-12">
                            <h2 class="card-title h2">${recipe.name}</h2>
                            <p class="card-text text-nowrap h4"><i class="bi bi-clock h4"></i> ${recipe.time} min</p>
                        </div>
                        <div class="card-text col-6">${this.putIngredientsInUlList(recipe.ingredients)}</div>
                        <p class="card-text col card__description text-truncate h6">${recipe.description}</p>
                    </div>
            </div>
        </article>
                                    `;
    }

    static displayNoRecipes = () =>{
        document.querySelector(".container").innerHTML=`
                            <p> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
                            `
    }

    static putIngredientsInUlList = ingredients =>{
        let result = `<ul>`;
        for(let i=0; i< ingredients.length; i++){
            if(ingredients[i].quantity!= undefined && ingredients[i].unit != undefined){
                result+= `<li><span class="h5">${ingredients[i].ingredient}:</span><span class="h6"> ${ingredients[i].quantity}`;
                switch(ingredients[i].unit){
                    case "grammes": result+= `g</span></li>`;
                    break;
                    case "cuillères à soupe": result+= ` c.a.s</span></li>`;
                    break;
                    default: result+= ` ${ingredients[i].unit}</span></li>`;
                    break;
                }
            } else if(ingredients[i].quantity!= undefined){
                result+= `<li><span class="h5">${ingredients[i].ingredient}:</span><span class="h6"> ${ingredients[i].quantity}</span></li>`;
            } else {
                result += `<li><span class="h5">${ingredients[i].ingredient}</span></li>`;
            }
        }
        result += `</ul>`;
        return result;
    }

    static flushRecipesInDOM =() =>{
        document.querySelector(".container").innerHTML = ``;
    }
}