import { search } from "./app.js";
import { Input } from "./inputs.js";
import { Search } from "./search.js";
import { Tag } from "./tag.js";

export class Ustensils extends Input{
    static init(){
        let ustensilsList = [];
        recipes.forEach(recipe =>{
            recipe.ustensils.forEach(ustensil =>{
                if(!ustensilsList.includes(ustensil.toLowerCase())){
                    ustensilsList.push(ustensil.toLowerCase());
                }
            })
        })
    }

    constructor(){
        super("Ustensile", "ustensil", "bg-danger");
        this.list = search.actualList;
    }

    refreshList = () =>{
        this.list = search.actualList;
        let refreshedList = [];
        for(let i=0; i< this.list.length ;i++){
            this.list[i].ustensils.forEach(ustensil => {
                if(!refreshedList.includes(ustensil.toLowerCase())) refreshedList.push(ustensil.toLowerCase());
            });
        }
        return refreshedList;
    }
}