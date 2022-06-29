import React from "react";
import { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { changeIndex } from "../redux/reducer/todoReducer";
import { changeIndex } from '../redux/ducks/todoApp'

function Todo({ todos, handleToggle, completeTask, unHandleToggle, changeOpen }) {

  const dispatch = useDispatch();

  // showSubtask === task.name display subtasks, showSubtask === null not display subtasks
  const [showSubtask, setShowSubtask] = useState(null);
  
  //editIndex === task.index show only that task
  const [editIndex, setEditIndex] = useState(null);

  //parent index to add a child subtask
  const [index, setIndex] = useState(useSelector((state) => state.index));

  
  
  

  const openClick = (name, index, id) => {
    setShowSubtask(name);
    setEditIndex(index)
    setIndex(id-1);
    changeOpen('1') //for the appearance of the add task button if value = 1 show Add Subtask button
    //console.log('show=>',showSubtask,'edit=>',editIndex)
  };

  const closeClick = () => {
    setShowSubtask(null);
    setEditIndex(null);
    changeOpen('0') //for the appearance of the add task button if value = 0 show Add Task button
    //console.log('show=>',showSubtask,'edit=>',editIndex)
  };

  useEffect(() => {
    dispatch(changeIndex(index));
  }, [index,dispatch]);


  

  return (
    <ListGroup>
      {Object.keys(todos).map((task, index) => (
        <ListGroup key={index}>
          <ListGroupItem
            style={{
              textDecoration: completeTask(todos[task].subdata) ? "line-through" : "none",
              display:
                editIndex === index || editIndex === null ? "block" : "none",
            }}
          >
            {`${index + 1}.  ${todos[task].name}  ( ${Object.keys(todos[task].subdata).length  }  subtasks ) `}
            <Button
              size="sm"
              className="btn1"
              variant="outline-secondary"
              onClick={closeClick}
            >
              Hide Subtasks
            </Button>
            <Button
              size="sm"
              className="mx-2 btn1"
              variant="outline-dark"
              onClick={() => {
                openClick(todos[task].name, index, todos[task].id);
              }}
            >
              Show Subtasks
            </Button>
          </ListGroupItem>
          {Object.keys(todos[task].subdata)
            .filter((child) => todos[task].subdata[child].complete === false)
            .map((child, index) => (
              <ListGroupItem
                style={{
                  textDecoration: child.complete ? "line-through" : "",
                  display: showSubtask === todos[task].name ? "block" : "none",
                }}
                key={index}
                className="mx-1"
              >
                {`${index + 1}.  ${todos[task].subdata[child].name}`}
                <Button
                  size="sm"
                  className="mx-5 btn1"
                  variant="outline-dark"
                  onClick={() => {
                    handleToggle(todos[task].subdata[child].id);
                  }}
                >
                  {<BsCheckLg />}
                </Button>
              </ListGroupItem>
            ))}
          <ListGroupItem
            style={{
              fontWeight: "bold",
              display: showSubtask === todos[task].name ? "block" : "none",
            }}
            className="mx-1"
          >
            Completed Subtasks
          </ListGroupItem>

          {Object.keys(todos[task].subdata)
            .filter((child) => todos[task].subdata[child].complete === true)
            .map((child, index) => (
              <ListGroupItem
                style={{
                  textDecoration: todos[task].subdata[child].complete ? "line-through" : "",
                  display: showSubtask === todos[task].name ? "block" : "none",
                }}
                key={index}
                className="mx-2"
              >
                {todos[task].subdata[child].name}
                <Button
                  size="sm"
                  className="mx-5 btn1"
                  variant="outline-dark"
                  onClick={() => {
                    unHandleToggle(todos[task].subdata[child].id);
                  }}
                >
                  {<BsXLg />}
                </Button>
              </ListGroupItem>
            ))}
        </ListGroup>
      ))}
    </ListGroup>
  );
}

export default Todo;
