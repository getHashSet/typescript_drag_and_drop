const iAmRoot = document.getElementById("root");

if (iAmRoot) {
  iAmRoot.innerHTML = "hello world";
}

function clickHandler(msg: string): void {
  console.log(msg);
}

const amazingRadFunction = (msg: string): string =>  `
${console.log(msg)}
${msg = "new message"}
`;

const amazingStuff = ():void => {
  console.log('no refunds');
}

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", clickHandler.bind(null, "clicked")); // first item in a bind callback is the what we want to use as "this"
}

amazingRadFunction("hello world");
