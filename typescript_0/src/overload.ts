type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type Leader = Admin & Employee;

const manager: Leader = {
  name: "Chuck",
  privileges: ["keys", "cash"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = string | boolean;

type Universal = Combinable & Numeric;

function addThis(a: number, b: number): number;
function addThis(a: string, b: string): string;
function addThis(a: string, b: number): string;
function addThis(a: Combinable, b: Combinable): Combinable {
  if (typeof a === "string" || typeof b === "string") {
    return `${a} ${b}`;
  }
  return a + b;
}

const result = addThis("Matthew", 42);
// ---- //
// NEXT //
// ---- //

const fetchUserData = {
  id: "u1",
  name: "Matthew",
  job: "frontend developer",
};

console.log(fetchUserData.job && fetchUserData.job);

const userInput = undefined;

const storedData = userInput ?? "DEFAULT"; // ?? Is this null or undefiend?

console.log(storedData);

// type UnknownEmployee = Employee | Leader;

// function printEmployeeInfo(emp: UnknownEmployee): string | void {
//   console.log(`Name: ${emp.name}`);
//   if ("privileges" in emp) {
//     console.log(`Can ${emp.privileges} \n`);
//   }
//   if ("startDate" in emp) {
//     console.log(`${emp.startDate}`);
//   }
// }

// printEmployeeInfo(manager);

// class Car {
//   drive() {
//     console.log("driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("driving...");
//   }

//   loadCargo(ammount: number) {
//     console.log(`${ammount} cargo loaded.`);
//   }
// }

// type Vehicle = Car | Truck;

// const mustang = new Car();
// const Tesla = new Truck();

// // function useVehicle(vehicle: Vehicle) {
// //   vehicle.drive();
// //   if (vehicle instanceof Truck) {
// //     console.log(vehicle.loadCargo(5));
// //   }
// // }

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed: number;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//       break;
//     default:
//       throw new Error("Error");
//   }
//   console.log(`Speed is: ${speed}`);
// }
// // moveAnimal({ type: "bird", flyingSpeed: 10 });

// const paragraph = document.getElementById("msg");

// if (paragraph) {
//   (paragraph as HTMLInputElement).value = "hello";
// }

// interface ErrorContainer {
//   id: string;
//   [key: string]: string;
// }

// const errorBag: ErrorContainer = {
//   id: "8675309",
//   1: "Not a valid email!",
//   2: "Must start with a Capital Letter.",
//   3: "Error",
// };
