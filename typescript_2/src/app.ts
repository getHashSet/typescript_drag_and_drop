// ----------------- //
//   DRAG AND DROP   //
// ----------------- //
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void; // tells the browser this is a valid drag target
  dropHandler(event: DragEvent): void; // this will handle the drop
  dragLeaveHandler(event: DragEvent): void; // revert back to original state
}

// ---------------- //
//   PROJECT TYPE   //
// ---------------- //
enum ProjectStatus {
  Active,
  Finsihed,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

// --------- //
//   STATE   //
// --------- //
class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.unshift(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// -------------- //
//   VALIDATION   //
// -------------- //
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validInput: Validatable) {
  let isValid: boolean = true;

  // check if string or number is both required and if there is a present value
  if (validInput.required) {
    isValid = isValid && validInput.value.toString().trim().length !== 0;
  }

  if (validInput.minLength != null && typeof validInput.value == "string") {
    isValid = isValid && validInput.value.length > validInput.minLength;
  }

  if (validInput.maxLength != null && typeof validInput.value == "string") {
    isValid = isValid && validInput.value.length <= validInput.maxLength;
  }

  if (validInput.min != null && typeof validInput.value === "number") {
    isValid = isValid && validInput.value > validInput.min;
  }

  if (validInput.max != null && typeof validInput.value === "number") {
    isValid = isValid && validInput.value < validInput.max;
  }

  return isValid;
}

// -------------- //
//   DECORATORS   //
// -------------- //
function autoBind(_0: any, _1: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// --------- //
//   CLASS   //
// --------- //
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  hostElement: T;
  templateEl: HTMLTemplateElement;
  element: U;

  constructor(
    templateID: string,
    hostElementID: string,
    insertAtStart: boolean,
    newElementID: string
  ) {
    this.templateEl = document.getElementById(
      templateID
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementID)! as T;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;

    if (newElementID) {
      this.element.id = newElementID;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBegining: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBegining ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    }
    return `${this.project.people} persons`;
  }

  constructor(hostID: string, project: Project) {
    super("single-project", hostID, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @autoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id); // see dataTransfer in javascript drag and drop events.
    event.dataTransfer!.effectAllowed = "move"; // change the pointer
  }

  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// ------------ //
//   SUBCLASS   //
// ------------ //
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @autoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finsihed
    );
  }

  @autoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLLIElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finsihed;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId: string = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}

// ---------- //
//   ONLOAD   //
// ---------- //
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
