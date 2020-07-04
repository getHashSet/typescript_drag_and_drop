"use strict";
/////////////// this is
// import { Request, Response, NextFunction } from "express";
// export const createTodo = (  req: Request,  res: Response,  next: NextFunction) => {};
//
/////////////// same as this
// export const createTodo: RequestHandler = (req, res, next) => {};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_models_1 = require("../models/todo.models");
const TODOS = [];
// ========== //
//   CREATE   //
// ========== //
exports.createTodo = (req, res, next) => {
    const text = req.body.text; // variable <name> = (req.body) as object with a text key of type string. Then call that key with dot notation or bracket notation.
    const newTodo = new todo_models_1.Todo(Math.random().toString(), text);
    // send to array
    TODOS.push(newTodo);
    res.status(201).json({
        msg: "Created todo",
        createTodo: newTodo,
    });
};
// ======== //
//   READ   //
// ======== //
exports.getTodo = (req, res, next) => {
    res.status(201).json({
        todos: TODOS,
    });
};
// ========== //
//   UPDATE   //
// ========== //
exports.updateTodo = (req, res, next) => {
    // add generic type that extends RequestHandler and let it know about the object it will receive. This adds support
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo in array.");
    }
    TODOS[todoIndex] = new todo_models_1.Todo(TODOS[todoIndex].id, updatedText); // make a new object and replace it. Do not update the current object
    res.status(201).json({
        msg: `${todoIndex} has been updated to say: ${updatedText}`,
        updatedTodo: TODOS[todoIndex],
    });
};
// ========== //
//   DELETE   //
// ========== //
exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo in array.");
    }
    TODOS.splice(todoIndex, 1);
    res.status(201).json({ msg: "Todo deleted" });
};
