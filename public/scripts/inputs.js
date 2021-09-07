import { search } from "./app.js";


export class Input {

    constructor(name, type, background){
        this.name = name;
        this.type = type;
        this.background = background;
        this.inputGroup = document.createElement(`div`);
        this.inputText = document.createElement(`input`);
        this.spanChevron = document.createElement(`span`);
        this.iconChevron = document.createElement(`i`);
        this.dropdown = document.createElement("div");
        this.ul = document.createElement("ul");
        this.createInput(`${name}s`, `${type}s`, background);
    }

    createInput = (name, type, background) =>{
        this.inputGroup.classList.add(`input-group`, `mb-3`, type, `rounded`);
        document.querySelector(`.container__inputs`).appendChild(this.inputGroup);
        this.inputText.classList.add(`form-control`, background, `${type}__text-input`, `text-white`);
        this.inputText.setAttribute(`type`, `text`);
        this.inputGroup.appendChild(this.inputText);
        this.spanChevron.classList.add(`input-group-text`, background, `chevron-${type}`, `rounded-right`);
        this.inputGroup.appendChild(this.spanChevron);
        this.iconChevron.classList.add(`bi`, `bi-chevron-down`, `text-white`);
        this.spanChevron.appendChild(this.iconChevron);
        this.inputText.setAttribute(`aria-label`, name);
        this.inputText.setAttribute(`placeholder`, name);
        this.spanChevron.addEventListener(`click`, this.switchToLargeInput);
        this.createDropdown();
        this.inputText.addEventListener(`input`, e =>{
            if(e.target.value.length > 0){
                this.searchElement(e);
            } else {
                this.hideList();
            }
         });
    }

    switchToLargeInput = () =>{
        this.inputGroup.classList.add(`${this.type}s-lg`);
        this.inputText.classList.remove(`${this.type}s__text-input`);
        this.inputText.classList.add(`${this.type}s__text-input-lg`);
        this.inputText.setAttribute(`aria-label`, `Recherche un ${this.name.toLowerCase()}`);
        this.inputText.setAttribute(`placeholder`, `Recherche un ${this.name.toLowerCase()}`);
        this.spanChevron.classList.remove(`chevron-${this.type}s`);
        this.spanChevron.classList.add(`chevron-${this.type}s-deployed`);
        this.iconChevron.classList.add(`bi-chevron-up`);
        this.iconChevron.classList.remove(`bi-chevron-down`);
        this.showList(this.refreshList());
        this.spanChevron.removeEventListener(`click`, this.switchToLargeInput);
        document.addEventListener(`click`, this.switchToSmallInput);
        this.inputGroup.addEventListener("click", e =>{
            e.stopPropagation();
        });
        this.inputText.addEventListener(`input`, e =>{
            this.searchElement(e);
         });
        this.spanChevron.addEventListener(`click`, this.switchToSmallInput);
    }

    switchToSmallInput = () =>{
        this.inputGroup.classList.remove(`${this.type}s-lg`);
        this.inputText.setAttribute(`aria-label`, `${this.names}`)
        this.inputText.setAttribute(`placeholder`, `${this.name}s`);
        this.iconChevron.classList.remove(`bi-chevron-up`);
        this.spanChevron.classList.remove(`chevron-${this.type}s-deployed`);
        this.iconChevron.classList.add(`bi-chevron-down`);
        this.spanChevron.classList.add(`chevron-${this.type}s`);
        this.inputText.value = ``;
        this.hideList();
        document.removeEventListener(`click`, this.switchToSmallInput);
        this.spanChevron.removeEventListener(`click`, this.switchToSmallInput)
        this.spanChevron.addEventListener(`click`, this.switchToLargeInput);
        this.inputText.addEventListener(`input`, e =>{
            if(e.target.value.length > 0){
                this.searchElement(e);
            } else {
                this.hideList();
            }
         });
    }

    createDropdown = () => {
        this.dropdown.classList.add(this.background, `${this.type}s__list`, `rounded-bottom`);
        this.dropdown.style.display = "none";
        this.inputGroup.appendChild(this.dropdown);
    }

    createList = list => { 
        this.ul.innerHTML = ``;
        this.dropdown.appendChild(this.ul);
        this.ul.classList.add(`${this.type}s__ul`)
        list.forEach(element => {
            const li = document.createElement("li");
            li.classList.add(`${this.background}`, `${this.type}`, `text-white`);
            li.innerHTML = element;
            this.ul.appendChild(li);
            li.addEventListener("click", e =>{
                search.addTag(this.type, element);
                this.createList(this.refreshList());
            });
        });
    }

    showList = (list) => {
        this.createList(list);
        this.dropdown.style.display = "flex";
    }

    searchElement = (e) =>{
        let filter = [];
        let list = this.refreshList();
        list.forEach(element => {
            if(element.includes(e.target.value)){
                filter.push(element);
            }
        });
        this.showList(filter);
    }

    hideList = () =>{
        this.dropdown.style.display = "none";
    }

}