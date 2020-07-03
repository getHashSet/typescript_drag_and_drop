"use strict";
// const add = (a: number) => a + 2;
// console.log(add(2));
// const printOutput: (a: string | number) => void = (output) =>
//   console.log(output);
// const buttons = document.querySelector("button");
// if (buttons) {
//   buttons.addEventListener("click", (e) => console.log(e));
// }
// const someFunction: (a: number) => number = (a: number, b: number = 3) => a + b;
// console.log(someFunction(5));
const games = ["dnd", "dice bowl"];
const activeHobbies = ["javascript"];
activeHobbies.push("typescript", ...games);
console.log(activeHobbies);
const person = {
    name: "matthew",
    age: 35,
};
const copiedPerson = Object.assign(Object.assign({}, person), { hobbies: Object.assign({}, activeHobbies) });
console.log(copiedPerson);
console.log(person);
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
// console.log(add(10, 12, 18, 42, 178, 16));
const tupl = (...numbers) => {
    return numbers.forEach((item) => {
        console.log(item);
    });
};
// console.log(tupl(5, 6, 7));
const [hobby1, hobby2] = games;
const { age: myAge } = copiedPerson;
//# sourceMappingURL=functions.js.map