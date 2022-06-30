import React from "react";
import { useState } from "react";
import { Button, Form, FormGroup, FormControl, Row } from "react-bootstrap";


function TodoForm(props) {

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //
  const handleSubmitTask = (e) => {
    e.preventDefault();
    props.addTask({
      id: Math.floor(Math.random() * 1000),
      name: input,
      subdata: [],
    });
    setInput("");
  };

  const handleSubmitSubTask = (e) => {
    e.preventDefault();
    props.addSubtask({
      id: Math.floor(Math.random() * 1000),
      name: input,
      complete: false,
    });
    setInput("");
  };


  return (
    <Row>
      <Form
        style={{ display: props.open === "0" ? "block" : "none" }}
        onSubmit={handleSubmitTask}
      >
        <FormGroup>
          <FormControl
            onChange={handleChange}
            value={input}
            type="text"
            placeholder="Add Task"
          />
          <Button variant="dark" type="submit">
            Add Task
          </Button>
        </FormGroup>
      </Form>
      <Form
        style={{ display: props.open === "1" ? "block" : "none" }}
        onSubmit={handleSubmitSubTask}
      >
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Add SubTask"
            onChange={handleChange}
            value={input}
          />
          <Button variant="dark" type="submit">
            Add Subtask
          </Button>
        </FormGroup>
      </Form>
    </Row>
  );
}

export default TodoForm;
