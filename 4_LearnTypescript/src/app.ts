import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Product } from "./product.model";

const products = [
  {
    title: "Rug",
    price: 29.99,
  },
  {
    title: "Eggs",
    price: 1.29,
  },
];

const newProduct = new Product("Hugo", 0);
validate(newProduct).then((error) => {
  if (error.length > 0) {
    console.log("Validation Errors");
    console.log(error);
  } else {
    console.log(newProduct.getInformation());
  }
});

const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}
