// ------------- //
//   NAMESPACE   //
// ------------- //
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />

namespace App {
  // ---------- //
  //   ONLOAD   //
  // ---------- //
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
