import Component from "./root-component";
import * as Validation from "../util/validation";
import { autoBind as Bind } from "../decorators/autobind";
import { projectState } from "../state/state";

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

  @Bind
  public configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  @Bind
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

    const titleValidateable: Validation.Validatable = {
      value: inputTitle,
      required: true,
      maxLength: 64,
    };

    const descriptionValidateable: Validation.Validatable = {
      value: inputDescription,
      required: true,
      minLength: 3,
    };

    const peopleValidateable: Validation.Validatable = {
      value: +inputPeople,
      required: true,
      min: 0,
      max: 300,
    };

    if (
      !Validation.validate(titleValidateable) ||
      !Validation.validate(descriptionValidateable) ||
      !Validation.validate(peopleValidateable)
    ) {
      //   throw Error("An input was missing or not valid");
      alert("Invalid input");
    } else {
      this.clearUserInput();
      return [inputTitle, inputDescription, +inputPeople];
    }
  }

  @Bind
  private clearUserInput(): void {
    this.titleInputElementField.value = "";
    this.descriptionElementField.value = "";
    this.peopleInputeElementField.value = "";
  }
}
