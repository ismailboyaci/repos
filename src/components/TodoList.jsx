import React from "react";
import { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Container } from "react-bootstrap";

//!redux
import { useSelector, useDispatch } from "react-redux";
//import { addTodo, addSubTodo, setToggle, setUnToggle } from "../redux/reducer/todoReducer";
import {
  addTodo,
  addSubTodo,
  setToggle,
  setUnToggle,
} from "../redux/ducks/todoApp";

function TodoList() {
  //redux toolkit
  //const todos = useSelector((state) => state.todos.todos);
  const todos = useSelector((state) => state.todos);

  const [open, setOpen] = useState("0"); //if value = 1 show Add Subtask button, if value = 0 show Add Task button

  const dispatch = useDispatch();

  //!actions
  // adding todo action
  const addTodos = (todo) => {
    dispatch(addTodo(todo));
  };

  // adding subtodo action
  const addSubTodos = (todo) => {
    dispatch(addSubTodo(todo));
  };

  //complete subtask function
  const handleToggle = (id) => {
    dispatch(setToggle(id));
  };

  //uncomplete subtask function
  const unHandleToggle = (id) => {
    dispatch(setUnToggle(id));
  };

  //if all subtasks complete then parent task complete
  /* const completeTask = (id) => {
    if (Object.keys(id).length > 0) {
      let comp = true;
      for (var i = 0; i < Object.keys(id).length; i++) {
        if (id[i].complete === true) {
        } else {
          comp = false;
        }
      }
      return comp;
    }
  }; */
  const completeTask = (id) => {
    if (Object.keys(id).length > 0) {
      let comp = true;
      const keys = Object.keys(id);
      keys.forEach((key) => {
        if (id[key].complete === true) {
        } else {
          comp = false;
        }
      });
      return comp;
    }
  };

  const changeOpen = (e) => {
    setOpen(e);
  };

  return (
    <Container>
      <Todo
        todos={todos}
        completeTask={completeTask}
        changeOpen={changeOpen}
        handleToggle={handleToggle}
        unHandleToggle={unHandleToggle}
      />
      <TodoForm addTask={addTodos} addSubtask={addSubTodos} open={open} />
    </Container>
  );
}

export default TodoList;
