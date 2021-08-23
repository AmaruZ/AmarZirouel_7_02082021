import { search } from "./app.js";
import { Input } from "./inputs.js";
import { Search } from "./search.js";
import { Tag } from "./tag.js";

export class Ingredients extends Input{
    static init(){
        let ingredientsList = [];
        recipes.forEach(recipe =>{
            recipe.ingredients.forEach(ingredient =>{
                if(!ingredientsList.includes(ingredient.ingredient.toLowerCase())){
                    ingredientsList.push(ingredient.ingredient.toLowerCase());
                }
            })
        })
    }

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

}