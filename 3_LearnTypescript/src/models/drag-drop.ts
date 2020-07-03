// ----------------- //
//   DRAG AND DROP   //
// ----------------- //

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // tells the browser this is a valid drag target
  dropHandler(event: DragEvent): void; // this will handle the drop
  dragLeaveHandler(event: DragEvent): void; // revert back to original state
}
