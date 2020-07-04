import React, { useState } from "react";

//
// Components
//
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

//
// Validation
//
import { ToDoModel } from "./models/Todo.models";

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<ToDoModel[]>([]);

  const todoAddHandler = (text: string) => {
    // setTodos([...todos, { id: Math.random().toString(), text: text }]); // ...todos could actually be behind the spread oporator in larger applicaitons. This could cause Errors even though its written correctly. This is because of the way react hands state.
    setTodos((prevTodos) => [
      // this function built into useState lets us grab prev<NAME> and use that array as a spread opporator on the ..todos
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDelete={todoDeleteHandler} />
    </div>
  );
};

export default App;
