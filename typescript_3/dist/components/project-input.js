var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "./root-component.js";
import * as Validation from "../util/validation.js";
import { autoBind as Bind } from "../decorators/autobind.js";
import { projectState } from "../state/state.js";
// ------------ //
//   SUBCLASS   //
// ------------ //
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElementField = this.element.querySelector("#title");
        this.descriptionElementField = this.element.querySelector("#description");
        this.peopleInputeElementField = this.element.querySelector("#people");
        this.configure();
    }
    renderContent() { }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInputMethod();
        console.log(userInput);
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
        }
    }
    gatherUserInputMethod() {
        const inputTitle = this.titleInputElementField.value;
        const inputDescription = this.descriptionElementField.value;
        const inputPeople = this.peopleInputeElementField.value;
        const titleValidateable = {
            value: inputTitle,
            required: true,
            maxLength: 64,
        };
        const descriptionValidateable = {
            value: inputDescription,
            required: true,
            minLength: 3,
        };
        const peopleValidateable = {
            value: +inputPeople,
            required: true,
            min: 0,
            max: 300,
        };
        if (!Validation.validate(titleValidateable) ||
            !Validation.validate(descriptionValidateable) ||
            !Validation.validate(peopleValidateable)) {
            //   throw Error("An input was missing or not valid");
            alert("Invalid input");
        }
        else {
            this.clearUserInput();
            return [inputTitle, inputDescription, +inputPeople];
        }
    }
    clearUserInput() {
        this.titleInputElementField.value = "";
        this.descriptionElementField.value = "";
        this.peopleInputeElementField.value = "";
    }
}
__decorate([
    Bind
], ProjectInput.prototype, "configure", null);
__decorate([
    Bind
], ProjectInput.prototype, "submitHandler", null);
__decorate([
    Bind
], ProjectInput.prototype, "clearUserInput", null);
//# sourceMappingURL=project-input.js.map