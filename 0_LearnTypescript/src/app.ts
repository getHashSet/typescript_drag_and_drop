function Factory(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Factory("LOGGING - PERSON")
class Person {
  name = "Max";

  constructor() {
    // console.log(`Creating person, ${this.name}.`);
  }
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const el = document.getElementById(hookId);
    const p = new constructor();
    if (el) {
      el.innerHTML = template;
      el.querySelector("h1")!.textContent = p.fullName;
    }
  };
}

@Factory("HUMAN")
@WithTemplate("<h1>Title</h2>", "app")
class Human {
  fullName: string = "Matthew James";

  constructor() {
    // right when this thing becomes a thing.
    console.log(this.fullName);
  }
}

//
// Human is a class but its never called.
//

const newPerson = new Person();
// console.log(newPerson.name);

@Factory("LOGGING - WEAPONS")
class Weapons {
  name = "Sword";

  constructor() {}
}

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator.");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, description: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log3(
  target: any,
  name: string | Symbol,
  description: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log(`Param decorator`);
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  public title: string;
  private _price: number;

  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Price should be a positive number");
    }
  }

  constructor(title: string, cost: number) {
    this.title = title;
    this._price = cost;
  }

  @Log3
  getPriceWithTax(@Log4 taxRate: number) {
    return this._price * (1 + taxRate);
  }
}

const soap = new Product("Soap", 4);
const magicWand = new Product("Magic Wand", 255);

function AutoBind(
  _0: any,
  _1: string | Symbol | number,
  description: PropertyDescriptor
) {
  const originalMethod: Function = description.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works.";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const myButton = document.querySelector("button")!;
myButton.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validateableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function IsRequired(target: any, propName: string): void {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string): void {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function Validate(obj: any): boolean {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let validateFlag = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          validateFlag = validateFlag && !!obj[prop];
          break;
        case "positive":
          validateFlag = validateFlag && obj[prop] > 0;
      }
    }
  }
  return validateFlag;
}

class Course {
  @IsRequired
  title: string;
  @PositiveNumber
  cost: number;

  constructor(title: string, cost: number) {
    this.title = title;
    this.cost = cost;
  }
}

const coursForm = document.querySelector("form")!;
coursForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const costEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const cost = costEl.value;

  const createdCourse = new Course(title, +cost);

  if (!Validate(createdCourse)) {
    throw Error("Doesnt track. Try again.");
  }
  console.log(createdCourse);
});
