// -------- //
//   ROOT   //
// -------- //
export default class Component {
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
//# sourceMappingURL=root-component.js.map