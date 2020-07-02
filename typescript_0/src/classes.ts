/* --------- */
/*   CLASS   */
/* --------- */
abstract class Department {
  //   private departmentName: string;
  protected employees: string[] = [];

  constructor(
    protected readonly __id: number | string,
    public departmentName: string
  ) {
    // this.departmentName = departmentName;
    // this.describe = this.describe.bind(this);
  }

  // by adding this: Department, typescript will look for the variable in the object "this"
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  static createEmployee(name: string) {
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
  constructor(id: string | number, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    console.log(`Describe: ID: ${this.__id}`);
  }
}

//                //
//   ACCOUNTING   //
//                //
class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No reports found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw Error("Please set a valid value.");
    }
    this.addReport(value);
  }

  constructor(id: string | number, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[reports.length - 1]; // display the last report in the array of strings. This needs to be updated in the method.
  }

  describe() {
    console.log(this.__id);
  }

  addReport(text: string): void {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReport(): void {
    console.log(this.lastReport);
  }

  addIntern(internName: string): void {
    if (internName !== "Matthew") {
      this.employees.push(internName);
    }
  }
}

const accounting = new AccountingDepartment("1704", []);
const it = new ITDepartment(1, ["Matthew"]);

const employee00001 = Department.createEmployee("Stan");

console.log(employee00001);

const reportExample: string =
  "this is a report string. Normally reports will be more complex than a single string.";
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
