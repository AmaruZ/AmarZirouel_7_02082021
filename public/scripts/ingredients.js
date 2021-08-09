import { Tag } from "./tag.js";

export class Ingredients {
    static init(){
        let ingredientsList = [];
        recipes.forEach(recipe =>{
            recipe.ingredients.forEach(ingredient =>{
                if(!ingredientsList.includes(ingredient.ingredient.toLowerCase())){
                    ingredientsList.push(ingredient.ingredient.toLowerCase());
                }
            })
        })
        /*const container = document.querySelector(".tags");
        const buttonIngredient = document.createElement("div");
        buttonIngredient.classList.add("input-group", "mb-3", "ingredients", "rounded");
        buttonIngredient.innerHTML = `
            <input type="text" class="form-control bg-primary text-white placeholder" aria-label="Ingrédients" placeholder="Ingrédients">
            <span class="input-group-text chevron-ingredients bg-primary"><i class="bi bi-chevron-down text-white"></i></span>
            `;
        container.appendChild(buttonIngredient);*/
        new Ingredients(ingredientsList);
    }

    constructor(list){
        this.list = list;
        this.element = document.querySelector(".ingredients");
        document.querySelector(".chevron-ingredients").addEventListener("click", e=>{
            this.showIngredients(this.list);
        });
    }

    showIngredients = list =>{
        this.element.innerHTML = `
            <input type="text" class="form-control bg-primary text-white placeholder" aria-label="Recherche un ingrédient" placeholder="Recherche un ingrédient" >
            <span class="input-group-text chevron-ingredients-deployed bg-primary"><i class="bi bi-chevron-up text-white"></i></span>
        `;
        this.element.style.width = "667px";
        document.querySelector(".chevron-ingredients-deployed").addEventListener("click", e=>{
            this.element.style.width = "10rem";
            this.element.innerHTML = `
                <input type="text" class="form-control bg-primary text-white placeholder" aria-label="Ingrédients" placeholder="Ingrédients" >
                <span class="input-group-text chevron-ingredients bg-primary"><i class="bi bi-chevron-down text-white"></i></span>
            `;
            document.querySelector(".chevron-ingredients").addEventListener("click", e=>{
                this.showIngredients(this.list);
            });
        });
        const ul = document.createElement("ul");
        ul.classList.add("bg-primary", "ingredients__list");
        list.forEach(ingredient =>{
            const li = document.createElement("li");
            li.classList.add("bg-primary", "text-white")
            li.innerHTML = ingredient;
            li.style.width = "222px"
            li.style.height = "30px"
            li.addEventListener("click", e=>{
                Tag.init(ingredient,0);
            });
            ul.appendChild(li);
        })
        this.element.appendChild(ul);
    }
}