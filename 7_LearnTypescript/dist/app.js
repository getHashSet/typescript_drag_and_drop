"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const body_parser_1 = require("body-parser");
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/todos", todo_routes_1.default);
app.use((err, req, res, next) => {
    res.status(500).send({
        msg: err.message,
    });
});
app.listen(3000);
