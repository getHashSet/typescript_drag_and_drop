const loadHere = document.getElementById("root");

//////////////////////////////////////////////////////
// NOTE: Add two numbers together and return a string.
//////////////////////////////////////////////////////
function add(num1: number, num2: number): string {
  return `${+num1 + +num2}`;
}

/////////////////////////////////////////
// NOTE: update inner HTML of DOM element
/////////////////////////////////////////
function log(str: string | number): void {
  loadHere.innerHTML = `${str}`;
}

//////////////////////////
// FUNCTION 3
//////////////////////////
function addHandle(n1: number, n2: number, cb: (num: number) => void): void {
  const result = +n1 + +n2;
  cb(result);
}

let combineValues: (a: number, b: number) => string;
combineValues = add;

// ======== //
//   CALL   //
// ======== //
log(combineValues(8, 8));

// ======= //
//   FIN   //
// ======= //

addHandle(10, 26, (result) => {
  log(result);
});
