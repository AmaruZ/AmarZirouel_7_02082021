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
        const container = document.querySelector(".container__inputs");
        let inputGroupIngredient = document.createElement("div");
        let inputTextIngredient = document.createElement("input");
        let spanChevronIngredient = document.createElement("span");
        inputGroupIngredient.classList.add("input-group", "mb-3", "ingredients", "rounded");
        container.appendChild(inputGroupIngredient);
        inputTextIngredient.classList.add("form-control", "bg-primary", "ingredients__text-input", "text-white");
        inputTextIngredient.setAttribute("type", "text");
        inputGroupIngredient.appendChild(inputTextIngredient);
        spanChevronIngredient.classList.add("input-group-text", "bg-primary", "chevron-ingredients", "rounded-right");
        inputGroupIngredient.appendChild(spanChevronIngredient);
        let iconChevronDown = document.createElement("i");
        iconChevronDown.classList.add("bi", "bi-chevron-down", "text-white");
        spanChevronIngredient.appendChild(iconChevronDown);
        new Ingredients(ingredientsList, inputGroupIngredient, inputTextIngredient, spanChevronIngredient, iconChevronDown);
    }

    constructor(list, inputGroup, inputText, btnChevron, iconChevron){
        this.list = list;
        this.inputGroup = inputGroup;
        this.inputText = inputText;
        this.btnChevron = btnChevron;
        this.iconChevron = iconChevron;
        this.containerList = document.createElement("div")
        this.ul = document.createElement("ul");
        this.createUstentilsInput();
    }

    createUstentilsInput = () =>{
        this.inputText.setAttribute("aria-label", "Ingrédients")
        this.inputText.setAttribute("placeholder", "Ingrédients");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-ingredients");
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchIngredient(e,this.list);
        });
    }

    resetIngredientsInput = () =>{
        this.hideIngredientsList();
        this.inputGroup.classList.remove("ingredients-lg");
        this.inputText.setAttribute("aria-label", "Ingrédients")
        this.inputText.setAttribute("placeholder", "Ingrédients");
        this.iconChevron.classList.remove("bi-chevron-up");
        this.btnChevron.classList.remove("chevron-ingredients-deployed");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-ingredients");
        this.inputText.value = "";
        document.removeEventListener("click", this.resetIngredientsInput);
        this.btnChevron.removeEventListener("click", this.resetIngredientsInput)
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchIngredient(e,this.list);
        });
    }

    createLargeUstentilsInput = () =>{
        this.inputGroup.classList.add("ingredients-lg");
        this.inputText.classList.remove("ingredients__text-input");
        this.inputText.classList.add("ingredients__text-input-lg");
        this.inputText.setAttribute("aria-label", "Recherche un ingrédient");
        this.inputText.setAttribute("placeholder", "Recherche un ingrédient");
        this.btnChevron.classList.remove("chevron-ingredients");
        this.btnChevron.classList.add("chevron-ingredients-deployed");
        this.iconChevron.classList.add("bi-chevron-up");
        this.iconChevron.classList.remove("bi-chevron-down");
        this.showIngredientsList(this.list);

        this.btnChevron.addEventListener("click", this.resetIngredientsInput);
    }

    showIngredientsList = list =>{
        this.ul.style.display = "flex";
        this.ul.classList.add("bg-primary", "ingredients__list", "rounded-bottom");
        this.ul.innerHTML = "";
        list.forEach(ingredient =>{
            let li = document.createElement("li");
            li.classList.add("bg-primary", "text-white", "ingredient")
            li.innerHTML = ingredient;
            li.addEventListener("click", e=>{
                Tag.init(ingredient,0);
                this.resetIngredientsInput();
            });
            this.ul.appendChild(li);
        })
        document.addEventListener("click", this.resetIngredientsInput); 
        this.inputGroup.addEventListener("click", e =>{
            e.stopPropagation();
        })
        this.inputGroup.appendChild(this.ul);
    }

    hideIngredientsList = () =>{
        this.ul.style.display = "none";
    }

    searchIngredient = (e, list) =>{
        let filter = [];
        list.forEach(element => {
            if(element.includes(e.target.value)){
                filter.push(element);
            }
        })
        this.showIngredientsList(filter);
    }
}