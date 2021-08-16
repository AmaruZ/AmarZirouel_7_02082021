import { Tag } from "./tag.js";

export class Ustensils {
    static init(){
        let ustensilsList = [];
        recipes.forEach(recipe =>{
            recipe.ustensils.forEach(ustensil =>{
                if(!ustensilsList.includes(ustensil.toLowerCase())){
                    ustensilsList.push(ustensil.toLowerCase());
                }
            })
        })
        /*const container = document.querySelector(".tags");
        const buttonustensil = document.createElement("div");
        buttonustensil.classList.add("input-group", "mb-3", "ustensils", "rounded");
        buttonustensil.innerHTML = `
            <input type="text" class="form-control bg-danger text-white placeholder" aria-label="Ingrédients" placeholder="Ingrédients">
            <span class="input-group-text chevron-ustensils bg-danger"><i class="bi bi-chevron-down text-white"></i></span>
            `;
        container.appendChild(buttonustensil);*/
        new Ustensils(ustensilsList);
    }

    constructor(list){
        this.list = list;
        this.element = document.querySelector(".ustensils");
        document.querySelector(".chevron-ustensils").addEventListener("click", e=>{
            this.showUstensils(this.list);
        });
    }

    showUstensils = list =>{
        this.element.innerHTML = `
            <input type="text" class="form-control bg-danger text-white placeholder" aria-label="Recherche un ustensile" placeholder="Recherche un ustensile" >
            <span class="input-group-text chevron-ustensils-deployed bg-danger rounded-right"><i class="bi bi-chevron-up text-white"></i></span>
        `;
        this.element.style.width = "667px";
        document.querySelector(".chevron-ustensils-deployed").addEventListener("click", e=>{
            this.element.style.width = "10rem";
            this.element.innerHTML = `
                <input type="text" class="form-control bg-danger text-white placeholder" aria-label="Ustensiles" placeholder="Ustensiles" >
                <span class="input-group-text chevron-ustensils bg-danger "><i class="bi bi-chevron-down text-white"></i></span>
            `;
            document.querySelector(".chevron-ustensils").addEventListener("click", e=>{
                this.showUstensils(this.list);
            });
        });
        const ul = document.createElement("ul");
        ul.classList.add("bg-danger", "ustensils__list");
        list.forEach(ustensil =>{
            const li = document.createElement("li");
            li.classList.add("bg-danger", "text-white")
            li.innerHTML = ustensil;
            li.style.width = "222px"
            li.style.height = "30px"
            li.addEventListener("click", e=>{
                Tag.init(ustensil,2);
            });
            ul.appendChild(li);
        })
        this.element.appendChild(ul);
    }
}