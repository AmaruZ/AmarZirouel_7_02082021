import { Tag } from "./tag.js";

export class Appliances {
    static init(){
        let appliancesList = [];
        recipes.forEach(recipe =>{
            if(!appliancesList.includes(recipe.appliance.toLowerCase())){
                appliancesList.push(recipe.appliance.toLowerCase());
            }
        })
        /*const container = document.querySelector(".tags");
        const buttonIngredient = document.createElement("div");
        buttonIngredient.classList.add("input-group", "mb-3", "ingredients", "rounded");
        buttonIngredient.innerHTML = `
            <input type="text" class="form-control bg-primary text-white placeholder" aria-label="Ingrédients" placeholder="Ingrédients">
            <span class="input-group-text chevron-ingredients bg-primary"><i class="bi bi-chevron-down text-white"></i></span>
            `;
        container.appendChild(buttonIngredient);*/
        new Appliances(appliancesList);
    }

    constructor(list){
        this.list = list;
        this.element = document.querySelector(".appareils");
        document.querySelector(".chevron-appareils").addEventListener("click", e=>{
            this.showAppliances(this.list);
        });
    }

    showAppliances = list =>{
        this.element.innerHTML = `
            <input type="text" class="form-control bg-success text-white placeholder" aria-label="Recherche un appareil" placeholder="Recherche un appareil" >
            <span class="input-group-text chevron-appareils-deployed bg-success"><i class="bi bi-chevron-up text-white"></i></span>
        `;
        this.element.style.width = "444px";
        document.querySelector(".chevron-appareils-deployed").addEventListener("click", e=>{
            this.element.style.width = "10rem";
            this.element.innerHTML = `
                <input type="text" class="form-control bg-success text-white placeholder" aria-label="Appareil" placeholder="Appareils" >
                <span class="input-group-text chevron-appareils bg-success"><i class="bi bi-chevron-down text-white"></i></span>
            `;
            document.querySelector(".chevron-appareils").addEventListener("click", e=>{
                this.showAppliances(this.list);
            });
        });
        const ul = document.createElement("ul");
        ul.classList.add("bg-success", "appliances__list");
        list.forEach(appliance =>{
            const li = document.createElement("li");
            li.classList.add("bg-success", "text-white")
            li.innerHTML = appliance;
            li.style.width = "222px"
            li.style.height = "30px"
            li.addEventListener("click", e=>{
                Tag.init(appliance,1);
            });
            ul.appendChild(li);
        })
        this.element.appendChild(ul);
    }
}