import { search } from "./app.js";
import { Input } from "./inputs.js";
import { Tag } from "./tag.js";

export class Appliances extends Input{
    static init(){
        let appliancesList = [];
        recipes.forEach(recipe =>{
            if(!appliancesList.includes(recipe.appliance.toLowerCase())){
                appliancesList.push(recipe.appliance.toLowerCase());
            }
        })

    }

    constructor(){
        super("Appareil", "appliance", "bg-success");
        this.list = search.actualList;
    }

    refreshList = () =>{
        this.list = search.actualList;
        let refreshedList = [];
        for(let i=0; i< this.list.length ;i++){
            if(!refreshedList.includes(this.list[i].appliance.toLowerCase())) refreshedList.push(this.list[i].appliance.toLowerCase());
        }
        return refreshedList;
    }

}