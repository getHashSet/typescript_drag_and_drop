namespace App {
  // --------- //
  //   CLASS   //
  // --------- //
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
