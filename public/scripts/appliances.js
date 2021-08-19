import { Tag } from "./tag.js";

export class Appliances {
    static init(){
        let appliancesList = [];
        recipes.forEach(recipe =>{
            if(!appliancesList.includes(recipe.appliance.toLowerCase())){
                appliancesList.push(recipe.appliance.toLowerCase());
            }
        })
        const container = document.querySelector(".container__inputs");
        let inputGroupAppliance = document.createElement("div");
        let inputTextAppliance = document.createElement("input");
        let spanChevronAppliance = document.createElement("span");
        inputGroupAppliance.classList.add("input-group", "mb-3", "appliances", "rounded");
        container.appendChild(inputGroupAppliance);
        inputTextAppliance.classList.add("form-control", "bg-success", "appliances__text-input", "text-white");
        inputTextAppliance.setAttribute("type", "text");
        inputGroupAppliance.appendChild(inputTextAppliance);
        spanChevronAppliance.classList.add("input-group-text", "bg-success", "chevron-appliances", "rounded-right");
        inputGroupAppliance.appendChild(spanChevronAppliance);
        let iconChevronDown = document.createElement("i");
        iconChevronDown.classList.add("bi", "bi-chevron-down", "text-white");
        spanChevronAppliance.appendChild(iconChevronDown);
        new Appliances(appliancesList, inputGroupAppliance, inputTextAppliance, spanChevronAppliance, iconChevronDown);
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
        this.inputText.setAttribute("aria-label", "Appareils")
        this.inputText.setAttribute("placeholder", "Appareils");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-appliances");
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchAppliance(e,this.list);
        });
    }

    resetAppliancesInput = () =>{
        this.hideAppliancesList();
        this.inputGroup.classList.remove("appliances-lg");
        this.inputText.setAttribute("aria-label", "Appareils")
        this.inputText.setAttribute("placeholder", "Appareils");
        this.iconChevron.classList.remove("bi-chevron-up");
        this.btnChevron.classList.remove("chevron-appliances-deployed");
        this.iconChevron.classList.add("bi-chevron-down");
        this.btnChevron.classList.add("chevron-appliances");
        this.inputText.value = "";
        document.removeEventListener("click", this.resetAppliancesInput);
        this.btnChevron.removeEventListener("click", this.resetAppliancesInput)
        this.btnChevron.addEventListener("click", this.createLargeUstentilsInput);
        this.inputText.addEventListener("input", e =>{
            this.searchAppliance(e,this.list);
        });
    }

    createLargeUstentilsInput = () =>{
        this.inputGroup.classList.add("appliances-lg");
        this.inputText.classList.remove("appliances__text-input");
        this.inputText.classList.add("appliances__text-input-lg");
        this.inputText.setAttribute("aria-label", "Recherche un appareil");
        this.inputText.setAttribute("placeholder", "Recherche un appareil");
        this.btnChevron.classList.remove("chevron-appliances");
        this.btnChevron.classList.add("chevron-appliances-deployed");
        this.iconChevron.classList.add("bi-chevron-up");
        this.iconChevron.classList.remove("bi-chevron-down");
        this.showAppliancesList(this.list);

        this.btnChevron.addEventListener("click", this.resetAppliancesInput);
    }

    showAppliancesList = list =>{
        this.ul.style.display = "flex";
        this.ul.classList.add("bg-success", "appliances__list", "rounded-bottom");
        this.ul.innerHTML = "";
        list.forEach(appliance =>{
            let li = document.createElement("li");
            li.classList.add("bg-success", "text-white", "appliance")
            li.innerHTML = appliance;
            li.addEventListener("click", e=>{
                Tag.init(appliance,1);
                this.resetAppliancesInput();
            });
            this.ul.appendChild(li);
        })
        document.addEventListener("click", this.resetAppliancesInput); 
        this.inputGroup.addEventListener("click", e =>{
            e.stopPropagation();
        })
        this.inputGroup.appendChild(this.ul);
    }

    hideAppliancesList = () =>{
        this.ul.style.display = "none";
    }

    searchAppliance = (e, list) =>{
        let filter = [];
        list.forEach(element => {
            if(element.includes(e.target.value)){
                filter.push(element);
            }
        })
        this.showAppliancesList(filter);
    }
}