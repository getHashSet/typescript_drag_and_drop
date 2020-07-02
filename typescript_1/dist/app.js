"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// ---------------- //
//   PROJECT TYPE   //
// ---------------- //
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finsihed"] = 1] = "Finsihed";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
// --------- //
//   STATE   //
// --------- //
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.unshift(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validInput) {
    let isValid = true;
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
function autoBind(_0, _1, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
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
class Component {
    constructor(templateID, hostElementID, insertAtStart, newElementID) {
        this.templateEl = document.getElementById(templateID);
        this.hostElement = document.getElementById(hostElementID);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementID) {
            this.element.id = newElementID;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBegining) {
        this.hostElement.insertAdjacentElement(insertAtBegining ? "afterbegin" : "beforeend", this.element);
    }
}
class ProjectItem extends Component {
    constructor(hostID, project) {
        super("single-project", hostID, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        return `${this.project.people} persons`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id); // see dataTransfer in javascript drag and drop events.
        event.dataTransfer.effectAllowed = "move"; // change the pointer
    }
    dragEndHandler(_) { }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autoBind
], ProjectItem.prototype, "dragStartHandler", null);
// ------------ //
//   SUBCLASS   //
// ------------ //
class ProjectInput extends Component {
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
        if (!validate(titleValidateable) ||
            !validate(descriptionValidateable) ||
            !validate(peopleValidateable)) {
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
    autoBind
], ProjectInput.prototype, "configure", null);
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
__decorate([
    autoBind
], ProjectInput.prototype, "clearUserInput", null);
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finsihed);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener((projects) => {
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
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
}
__decorate([
    autoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autoBind
], ProjectList.prototype, "dragLeaveHandler", null);
// ---------- //
//   ONLOAD   //
// ---------- //
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
//# sourceMappingURL=app.js.map