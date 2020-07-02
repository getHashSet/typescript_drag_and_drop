"use strict";
const loadHere = document.getElementById("root");
//////
// LOG
// NOTE: update inner HTML of DOM element
//////////////////////////////////////////
function log(str) {
    loadHere.innerHTML = `${str}`;
}
const userInput = document.getElementById("user_input"); // HTMLInputElement has a value type (its always a string), but HTMLElement does not.
const userButton = document.getElementById("user_button");
userButton.addEventListener("click", () => {
    log(userInput.value);
});
///////////
// ON LOAD
///////////
log("hello again");
//////////////
// ERROR THROW
//////////////
function makeError(msg, code) {
    throw { message: msg, errorCode: code };
}
makeError(`You have made a mistake`, 13);
