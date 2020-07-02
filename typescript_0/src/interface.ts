interface Named {
  readonly name: string;
}

type AddFn = (a: number, b: number) => number;

// interface AddFn {
//   (a: number, b: number): number;
// }

let adding: AddFn;
adding = (a, b) => a + b;

interface Name {
  readonly name: string;
  outputName?: string;
}


// Interfaces mother trucker!!
interface Greetable extends Named {
  // readonly name: string (Named)
  firstName: string;
  lastName: string;
  age: number;

  // methods
  fullName(): string;
  greet(phrase: string): void;
}

let player1: Greetable;

player1 = {
  name: "Joe",
  firstName: "Matthew",
  lastName: "Carpenter",
  age: 35,

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  greet(phrase: string) {
    console.log(`${phrase}, ${this.fullName()}.`);
  },
};

console.log(player1);
player1.greet("How do you do");
