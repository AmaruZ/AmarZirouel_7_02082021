import { search } from "./app.js";
import { Input } from "./inputs.js";

export class Ingredients extends Input{

    constructor(){
        super("Ingrédient", "ingredient", "bg-primary");
        this.list = search.actualList;
    }

    refreshList = () =>{
        this.list = search.actualList;
        let refreshedList = [];
        for(let i=0; i< this.list.length ;i++){
            this.list[i].ingredients.forEach(ingredient => {
                if(!refreshedList.includes(ingredient.ingredient.toLowerCase())) refreshedList.push(ingredient.ingredient.toLowerCase());
            });
        }
        return refreshedList;
    }
    static getallIngredients(){
        let ingredients = [];
        let include = false;
        for(let i = recipes.length-1; i>0; i--){

            include = false;
            for(let ingredient of recipes[i].ingredients){
                ingredients.forEach(element =>{
                    if(element.name == ingredient.ingredient){
                        include = true;
                        console.log(ingredients)
                        ingredients[ingredients.indexOf(element)].ids += `,${recipes[i].id}`;
                    }
                });
                if(include == false) ingredients.push({name: ingredient.ingredient, ids: `${recipes[i].id}`});
                include = false;
            }
        }
        return ingredients;
    }



}