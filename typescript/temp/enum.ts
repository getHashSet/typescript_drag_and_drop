let log: any = "Typescript Loaded";
const loadHere = document.getElementById("root");

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person: {
  name: string;
  age: number;
  skills: string[];
  role: number;
} = {
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
