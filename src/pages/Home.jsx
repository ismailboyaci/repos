import React from 'react'
import { useState, useEffect } from 'react'
import {
    Container, Row, Col, ListGroupItem,
    Button, FormGroup, ListGroup, Form, FormControl
} from 'react-bootstrap'
import todolist from '../data.json'



function Home() {


    const userData = JSON.parse(localStorage.getItem('userData'));
    const [data, setData] = useState(todolist);
    const [repoData, setRepoData] = useState();
    const [open, setOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [tName, setTName] = useState('')



    useEffect(() => {
        function getrepos() {
            fetch(`https://api.github.com/user/${userData.providerData[0].uid}/repos`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        const list = result.map((item, i) => (
                            <ListGroup key={item.name} >
                                <ListGroup.Item >{item.name}</ListGroup.Item>
                            </ListGroup >
                        ));
                        setRepoData(list);
                    },
                    (error) => {
                        console.log(error);
                    });
        }
        getrepos();
    }, [])

    const openClick = (name) => {
        setOpen(name)
        setTName(name)
    };

    const closeClick = () => {
        setOpen(false)
    };

    const handleToggle = (id) => {
        var index = data.findIndex(item => item.name === tName)
        var subindex = data[index].subdata.findIndex(item => item.id === id)
        let copy = [...data]
        copy[index].subdata[subindex].complete = true
        setData(copy)
    };

    const handleChange = (e) => {
        setUserInput(e.target.value)
    };

    const taskSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput('');
    };

    const addTask = (userInput) => {
        let copy = [...data];
        copy = [...copy, { id: data.length + 1, name: userInput, subdata: [] }];
        setData(copy);
    };

    const subTaskSubmit = (e) => {
        e.preventDefault();
        addSubTask(userInput);
        setUserInput('');
    };

    const addSubTask = (userInput) => {
        var index = data.findIndex(item => item.name === tName)
        let copy = [...data];
        copy[index].subdata.push({
            id: 100 + copy[index].subdata.length + 1,
            name: userInput,
            complete: false
        })
        setData(copy)
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
        }

    }

    return (

        <Container >
            <Row>
                <Col className="mt-5">
                    {userData.displayName} Repository
                </Col>
                <Col className="mt-5">
                    Todo list
                </Col>
            </Row>
            <Row>
                <Col className="mt-5" >
                    {repoData}
                </Col>
                <Col className="mt-5">
                    <ListGroup >
                        {data.map((task, id) => (
                            <ListGroup key={id}>
                                <ListGroupItem style={{ textDecoration: completeTask(task) ? 'line-through' : 'none' }} >
                                    {task.name}---({task.subdata.length} subtask)
                                    <Button onClick={() => { openClick(task.name) }} size="sm" variant="outline-dark">Show Subtasks</Button>
                                    <Button onClick={closeClick} size="sm" variant="outline-secondary">Hide Subtasks</Button>
                                </ListGroupItem>
                                <ListGroup>
                                    {task.subdata.filter(child=>child.complete===false).map((child, id) => (
                                        <ListGroupItem onClick={() => { handleToggle(child.id) }} style={{ display: open === task.name ? 'block' : 'none', textDecoration: child.complete ? 'line-through' : '' }} key={child.id}
                                        >{child.name}
                                        </ListGroupItem>
                                    ))}
                                    <ListGroupItem style={{ display: open === task.name ? 'block' : 'none', fontWeight: 'bold'}} >Completed Subtasks</ListGroupItem>
                                    {task.subdata.filter(child=>child.complete===true).map((child, id) => (
                                        
                                        <ListGroupItem onClick={() => { handleToggle(child.id) }} style={{ display: open === task.name ? 'block' : 'none', textDecoration: child.complete ? 'line-through' : '' }} key={child.id}
                                        >{child.name}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </ListGroup>
                            
                        ))}
                    </ListGroup>
                    <Form style={{ display: open ? 'none' : 'block' }} onSubmit={taskSubmit}>
                        <FormGroup>
                            <FormControl onChange={handleChange} value={userInput} type="text" placeholder="Add Task" />
                            <Button variant='dark' type='submit'>
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                    <Form style={{ display: open ? 'block' : 'none' }} onSubmit={subTaskSubmit}>
                        <FormGroup>
                            <FormControl onChange={handleChange} value={userInput} type="text" placeholder="Add SubTask" />
                            <Button variant='dark' type='submit'>
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Home