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

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const fakeObj: {
  adv: string;
  age: number;
  newArr: string[];
} = {
  adv: "hello",
  age: 41,
  newArr: ["David", "Maco"],
};

const newObj = merge(fakeObj, { age: 35 });

// console.log(newObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length > 0) {
    description = `Got ${element.length} elements.`;
  }
  return [element, description];
}

console.log(countAndDescribe(newObj.newArr));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
): string {
  return `Object value is: ${obj[key]}`;
}

// console.log(extractAndConvert({ name: "billy", age: 14 }, "age"));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Matthew");
textStorage.addItem("32");
textStorage.addItem("Bill");
textStorage.removeItem("Matthew");
console.log(textStorage);

const numberStorage = new DataStorage<number>();
numberStorage.addItem(32);
numberStorage.addItem(42);
console.log(numberStorage.getItems());

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: "Max" });
// objectStorage.addItem({ name: "Manu" });
// objectStorage.removeItem({ name: "Manu" });
// console.log(objectStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Sean Scharr", "Sports"];
// names.push("Seandra Scharr");

