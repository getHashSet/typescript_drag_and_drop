let log: any = "Typescript Loaded";
const loadHere = document.getElementById("root");

// ========= //
//   START   //
// ========= //
type UnionType = string | number;

// ============ //
//   FUNCTION   //
// ============ //
function combine(
  input1: UnionType,
  input2: UnionType,
  resultingIn: "make-number" | "make-string" // this makes it so the intelibox gives you the string options.
): void {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultingIn === "make-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = `${input1} ${input2}`;
  }
  return result;
};

// ======= //
//   LOG   //
// ======= //
log = combine(42, "52", "make-number");

// ======= //
//   FIN   //
// ======= //
loadHere.innerHTML = log;
