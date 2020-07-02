console.log("start");
//
const start = Date.now();

function sayHello(num, num2) {
  let number = 0;
  for (let i = 0; i < 1000000; i++) {
    number += num + num2 * i;
  }

  // let i = 0;
  // while (i < 1000000) {
  //   number += num + num2 * i;
  //   i++;
  // }

  console.log(number);
}

const userinput = 3;
const someNumberValue = 42;
sayHello(userinput, someNumberValue);

const fin = Math.floor(Date.now() - start);
//
console.log(fin);
