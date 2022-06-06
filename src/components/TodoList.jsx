import React from 'react'
import todolist from '../data.json'
import { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo';
import { Container } from 'react-bootstrap';

function TodoList() {

  const [todos, setTodos] = useState(todolist);
  



  const addTodo = todo => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
  };

  const addSubtask = (todo) => {
    var index = todos.findIndex(item => item.name === sessionStorage.getItem('name'))
    const copy = [...todos];
    copy[index].subdata.push(todo)
    setTodos(copy)
  };

  const handleToggle = (id, taskName) => {
    var index = todos.findIndex(item => item.name === taskName)
    var subindex = todos[index].subdata.findIndex(item => item.id === id)
    const copy = [...todos]
    copy[index].subdata[subindex].complete = true
    setTodos(copy)
  };

  const unHandleToggle = (id, taskName) => {
    var index = todos.findIndex(item => item.name === taskName)
    var subindex = todos[index].subdata.findIndex(item => item.id === id)
    const copy = [...todos]
    copy[index].subdata[subindex].complete = false
    setTodos(copy)
  };

  const completeTask = (id) => {

    if (id.subdata.length > 0) {
        let comp = true
        for (var i = 0; i < id.subdata.length; i++) {
            if (id.subdata[i].complete === true) {
            } else {
                comp = false
            }
        } return comp
    }};


  return (
    <Container>
      <Todo todos={todos} handleToggle={handleToggle} unHandleToggle={unHandleToggle} completeTask={completeTask}/>
      <TodoForm addTask={addTodo} addSubtask={addSubtask}  />
    </Container>
  )
}

export default TodoList