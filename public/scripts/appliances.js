import { search } from "./app.js";
import { Input } from "./inputs.js";

export class Appliances extends Input{

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