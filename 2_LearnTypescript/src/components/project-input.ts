/// <reference path="root-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/state.ts" />

namespace App {
  // ------------ //
  //   SUBCLASS   //
  // ------------ //
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElementField: HTMLInputElement;
    descriptionElementField: HTMLInputElement;
    peopleInputeElementField: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElementField = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionElementField = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputeElementField = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
      this.configure();
    }

    renderContent() {}

    @autoBind
    public configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    @autoBind
    private submitHandler(e: Event) {
      e.preventDefault();
      const userInput = this.gatherUserInputMethod();

      console.log(userInput);

      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        console.log(title, desc, people);
      }
    }

    private gatherUserInputMethod(): [string, string, number] | void {
      const inputTitle = this.titleInputElementField.value;
      const inputDescription = this.descriptionElementField.value;
      const inputPeople = this.peopleInputeElementField.value;

      const titleValidateable: Validatable = {
        value: inputTitle,
        required: true,
        maxLength: 64,
      };

      const descriptionValidateable: Validatable = {
        value: inputDescription,
        required: true,
        minLength: 3,
      };

      const peopleValidateable: Validatable = {
        value: +inputPeople,
        required: true,
        min: 0,
        max: 300,
      };

      if (
        !validate(titleValidateable) ||
        !validate(descriptionValidateable) ||
        !validate(peopleValidateable)
      ) {
        //   throw Error("An input was missing or not valid");
        alert("Invalid input");
      } else {
        this.clearUserInput();
        return [inputTitle, inputDescription, +inputPeople];
      }
    }

    @autoBind
    private clearUserInput(): void {
      this.titleInputElementField.value = "";
      this.descriptionElementField.value = "";
      this.peopleInputeElementField.value = "";
    }
  }
}
