import { search } from "./app.js";
import { Input } from "./inputs.js";

export class Ustensils extends Input{

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