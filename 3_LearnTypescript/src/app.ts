import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

// -------- //
//   ROOT   //
// -------- //
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

console.log('hello world');