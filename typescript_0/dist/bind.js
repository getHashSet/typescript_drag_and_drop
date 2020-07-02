"use strict";
const iAmRoot = document.getElementById("root");
if (iAmRoot) {
    iAmRoot.innerHTML = "hello world";
}
function clickHandler(msg) {
    console.log(msg);
}
const amazingRadFunction = (msg) => `
${console.log(msg)}
${msg = "new message"}
`;
const amazingStuff = () => {
    console.log('no refunds');
};
const button = document.querySelector("button");
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "clicked")); // first item in a bind callback is the what we want to use as "this"
}
amazingRadFunction("hello world");
//# sourceMappingURL=bind.js.map