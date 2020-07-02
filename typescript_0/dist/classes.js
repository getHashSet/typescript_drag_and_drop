"use strict";
/* --------- */
/*   CLASS   */
/* --------- */
class Department {
    constructor(__id, departmentName) {
        this.__id = __id;
        this.departmentName = departmentName;
        //   private departmentName: string;
        this.employees = [];
        // this.departmentName = departmentName;
        // this.describe = this.describe.bind(this);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    static createEmployee(name) {
        return { name: name };
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// ------------ //
//   SUBCLASS   //
// ------------ //
//        //
//   IT   //
//        //
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log(`Describe: ID: ${this.__id}`);
    }
}
//                //
//   ACCOUNTING   //
//                //
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[reports.length - 1]; // display the last report in the array of strings. This needs to be updated in the method.
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No reports found.");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw Error("Please set a valid value.");
        }
        this.addReport(value);
    }
    describe() {
        console.log(this.__id);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.lastReport);
    }
    addIntern(internName) {
        if (internName !== "Matthew") {
            this.employees.push(internName);
        }
    }
}
const accounting = new AccountingDepartment("1704", []);
const it = new ITDepartment(1, ["Matthew"]);
const employee00001 = Department.createEmployee("Stan");
console.log(employee00001);
const reportExample = "this is a report string. Normally reports will be more complex than a single string.";
// accounting.addReport(reportExample);
accounting.addReport(reportExample);
accounting.addEmployee("Rupert");
accounting.mostRecentReport = "Testing";
// accounting.mostRecentReport = "";
accounting.mostRecentReport = "one two three";
it.addEmployee("Max");
it.addEmployee("Matthew");
accounting.addIntern("Bill");
accounting.addEmployee("Martha");
accounting.addIntern("Matthew");
accounting.describe();
it.describe();
console.log(accounting);
// console.log(accounting);
// accounting.printReport();
console.log(accounting.mostRecentReport);
// accounting.describe();
// const accountingCopy = {
//   departmentName: "sales",
//   describe: accounting.describe,
// };
// accountingCopy.describe();
// accounting.printEmployeeInformation();
//# sourceMappingURL=classes.js.map