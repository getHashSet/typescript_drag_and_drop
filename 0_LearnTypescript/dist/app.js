"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Factory(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
let Person = class Person {
    constructor() {
        this.name = "Max";
        // console.log(`Creating person, ${this.name}.`);
    }
};
Person = __decorate([
    Factory("LOGGING - PERSON")
], Person);
function WithTemplate(template, hookId) {
    return function (constructor) {
        const el = document.getElementById(hookId);
        const p = new constructor();
        if (el) {
            el.innerHTML = template;
            el.querySelector("h1").textContent = p.fullName;
        }
    };
}
let Human = class Human {
    constructor() {
        this.fullName = "Matthew James";
        // right when this thing becomes a thing.
        console.log(this.fullName);
    }
};
Human = __decorate([
    Factory("HUMAN"),
    WithTemplate("<h1>Title</h2>", "app")
], Human);
//
// Human is a class but its never called.
//
const newPerson = new Person();
// console.log(newPerson.name);
let Weapons = class Weapons {
    constructor() {
        this.name = "Sword";
    }
};
Weapons = __decorate([
    Factory("LOGGING - WEAPONS")
], Weapons);
// ---
function Log(target, propertyName) {
    console.log("Property Decorator.");
    console.log(target, propertyName);
}
function Log2(target, name, description) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(description);
}
function Log3(target, name, description) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(description);
}
function Log4(target, name, position) {
    console.log(`Param decorator`);
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(title, cost) {
        this.title = title;
        this._price = cost;
    }
    set price(value) {
        if (value > 0) {
            this._price = value;
        }
        else {
            throw new Error("Price should be a positive number");
        }
    }
    getPriceWithTax(taxRate) {
        return this._price * (1 + taxRate);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const soap = new Product("Soap", 4);
const magicWand = new Product("Magic Wand", 255);
function AutoBind(_0, _1, description) {
    const originalMethod = description.value;
    const adjDescriptor = {
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
    constructor() {
        this.message = "This works.";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const myButton = document.querySelector("button");
myButton.addEventListener("click", p.showMessage);
const registeredValidators = {};
function IsRequired(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["required"] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["positive"] });
}
function Validate(obj) {
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
    constructor(title, cost) {
        this.title = title;
        this.cost = cost;
    }
}
__decorate([
    IsRequired
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "cost", void 0);
const coursForm = document.querySelector("form");
coursForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const costEl = document.getElementById("price");
    const title = titleEl.value;
    const cost = costEl.value;
    const createdCourse = new Course(title, +cost);
    if (!Validate(createdCourse)) {
        throw Error("Doesnt track. Try again.");
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map