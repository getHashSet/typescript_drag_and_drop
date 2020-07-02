"use strict";
let log = "Typescript Loaded";
const loadHere = document.getElementById("root");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: "Matthew",
    age: 35,
    skills: ["typescript", "html"],
    role: Role.READ_ONLY,
};
if (person.role === Role.ADMIN) {
    log = "You're an Admin.";
}
// ======= //
//   FIN   //
// ======= //
loadHere.innerHTML = log;
