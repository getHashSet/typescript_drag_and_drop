"use strict";
const loadHere = document.getElementById("root");
//////////////////////////////////////////////////////
// NOTE: Add two numbers together and return a string.
//////////////////////////////////////////////////////
function add(num1, num2) {
    return `${+num1 + +num2}`;
}
/////////////////////////////////////////
// NOTE: update inner HTML of DOM element
/////////////////////////////////////////
function log(str) {
    loadHere.innerHTML = `${str}`;
}
//////////////////////////
// FUNCTION 3
//////////////////////////
function addHandle(n1, n2, cb) {
    const result = +n1 + +n2;
    cb(result);
}
let combineValues;
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
