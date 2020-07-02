"use strict";
// interface AddFn {
//   (a: number, b: number): number;
// }
let adding;
adding = (a, b) => a + b;
let player1;
player1 = {
    name: "Joe",
    firstName: "Matthew",
    lastName: "Carpenter",
    age: 35,
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    greet(phrase) {
        console.log(`${phrase}, ${this.fullName()}.`);
    },
};
console.log(player1);
player1.greet("How do you do");
//# sourceMappingURL=interface.js.map