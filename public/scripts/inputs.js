export class Input {
    static init(type){
        let ingredientsList = [];
        let appliancesList = [];
        let ustensilsList = [];
        recipes.forEach(recipe =>{
            recipe.ingredients.forEach(ingredient =>{
                if(!ingredientsList.includes(ingredient.ingredient.toLowerCase())){
                    ingredientsList.push(ingredient.ingredient.toLowerCase());
                }
            });
            recipe.ustensils.forEach(ustensil =>{
                if(!ustensilsList.includes(ustensil.toLowerCase())){
                    ustensilsList.push(ustensil.toLowerCase());
                }
            });
            recipes.forEach(recipe =>{
                if(!appliancesList.includes(recipe.appliance.toLowerCase())){
                    appliancesList.push(recipe.appliance.toLowerCase());
                }
            });
        });
        let list = [];
        switch(type){
            case "ingredients": {
                list = ingredientsList;
                
            }
                
        }

        const container = document.querySelector(".container__inputs");
        let inputGroupUstensil = document.createElement("div");
        let inputTextUstensil = document.createElement("input");
        let spanChevronUstensil = document.createElement("span");
        inputGroupUstensil.classList.add("input-group", "mb-3", "ustensils", "rounded");
        container.appendChild(inputGroupUstensil);
        inputTextUstensil.classList.add("form-control", "bg-danger", "ustensils__text-input", "text-white");
        inputTextUstensil.setAttribute("type", "text");
        inputGroupUstensil.appendChild(inputTextUstensil);
        spanChevronUstensil.classList.add("input-group-text", "bg-danger", "chevron-ustensils", "rounded-right");
        inputGroupUstensil.appendChild(spanChevronUstensil);
        let iconChevronDown = document.createElement("i");
        iconChevronDown.classList.add("bi", "bi-chevron-down", "text-white");
        spanChevronUstensil.appendChild(iconChevronDown);
    }

    constructor(list, inputGroup, inputText, btnChevron, iconChevron){
        this.list = list;
        this.inputGroup = inputGroup;
        this.inputText = inputText;
        this.btnChevron = btnChevron;
        this.iconChevron = iconChevron;
        this.ul = document.createElement("ul");
        this.createUstentilsInput();
    }

    createUstentilsInput = () =>{
        this.inputText.setAttribute("aria-label", "Ustensiles")
        this.inputText.setAttribute("placeholder", "Ustensiles");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-ustensils");
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchUstensil(e,this.list);
        });
    }

    resetUstensilsInput = () =>{
        this.hideUstensilsList();
        this.inputGroup.classList.remove("ustensils-lg");
        this.inputText.setAttribute("aria-label", "Ustensiles")
        this.inputText.setAttribute("placeholder", "Ustensiles");
        this.iconChevron.classList.remove("bi-chevron-up");
        this.btnChevron.classList.remove("chevron-ustensils-deployed");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-ustensils");
        this.inputText.value = "";
        document.removeEventListener("click", this.resetUstensilsInput);
        this.btnChevron.removeEventListener("click", this.resetUstensilsInput)
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchUstensil(e,this.list);
        });
    }

    createLargeUstentilsInput = () =>{
        this.inputGroup.classList.add("ustensils-lg");
        this.inputText.classList.remove("ustensils__text-input");
        this.inputText.classList.add("ustensils__text-input-lg");
        this.inputText.setAttribute("aria-label", "Recherche un ustensile");
        this.inputText.setAttribute("placeholder", "Recherche un ustensile");
        this.btnChevron.classList.remove("chevron-ustensils");
        this.btnChevron.classList.add("chevron-ustensils-deployed");
        this.iconChevron.classList.add("bi-chevron-up");
        this.iconChevron.classList.remove("bi-chevron-down");
        this.showUstensilsList(this.list);

        this.btnChevron.addEventListener("click", this.resetUstensilsInput);
    }

    showUstensilsList = list =>{
        this.ul.style.display = "flex";
        this.ul.classList.add("bg-danger", "ustensils__list", "rounded-bottom");
        this.ul.innerHTML = "";
        list.forEach(ustensil =>{
            let li = document.createElement("li");
            li.classList.add("bg-danger", "text-white", "ustensil")
            li.innerHTML = ustensil;
            li.addEventListener("click", e=>{
                Tag.init(ustensil,2);
                this.resetUstensilsInput();
            });
            this.ul.appendChild(li);
        })
        document.addEventListener("click", this.resetUstensilsInput); 
        this.inputGroup.addEventListener("click", e =>{
            e.stopPropagation();
        })
        this.inputGroup.appendChild(this.ul);
    }

    hideUstensilsList = () =>{
        this.ul.style.display = "none";
    }

    searchUstensil = (e, list) =>{
        let filter = [];
        list.forEach(element => {
            if(element.includes(e.target.value)){
                filter.push(element);
            }
        })
        this.showUstensilsList(filter);
    }
}