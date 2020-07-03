const loadHere = document.getElementById("root");

//////
// LOG
// NOTE: update inner HTML of DOM element
//////////////////////////////////////////
function log(str: string | number): void {
  loadHere.innerHTML = `${str}`;
}

const userInput = document.getElementById("user_input") as HTMLInputElement; // HTMLInputElement has a value type (its always a string), but HTMLElement does not.
const userButton = document.getElementById("user_button") as HTMLInputElement;

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
function makeError(msg: string, code: number): never {
  throw { message: msg, errorCode: code };
}

makeError(`You have made a mistake`, 13);
