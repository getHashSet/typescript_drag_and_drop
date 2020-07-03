"use strict";
// // Code goes here!
// const names: Array<string> = [];
// console.log("Step: 1");
// const emptyPromise: Promise<string> = new Promise((data) => {
//   setTimeout(() => {
//     data("Step: 2");
//   }, 2000);
// });
// emptyPromise.then((data) => {
//   console.log(data);
// });
// console.log("Step: 3");
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const fakeObj = {
    adv: "hello",
    age: 41,
    newArr: ["David", "Maco"],
};
const newObj = merge(fakeObj, { age: 35 });
function countAndDescribe(element) {
    let description = "Got no value";
    if (element.length > 0) {
        description = `Got ${element.length} elements.`;
    }
    return [element, description];
}
console.log(countAndDescribe(newObj.newArr));
function extractAndConvert(obj, key) {
    return `Object value is: ${obj[key]}`;
}
// console.log(extractAndConvert({ name: "billy", age: 14 }, "age"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Matthew");
textStorage.addItem("32");
textStorage.addItem("Bill");
textStorage.removeItem("Matthew");
console.log(textStorage);
const numberStorage = new DataStorage();
numberStorage.addItem(32);
numberStorage.addItem(42);
console.log(numberStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ["Sean Scharr", "Sports"];
// names.push("Seandra Scharr");
//# sourceMappingURL=unity.js.map