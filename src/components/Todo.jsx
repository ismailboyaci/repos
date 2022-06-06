import React from 'react'
import { useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useEffect } from 'react';


function Todo({ todos, handleToggle, completeTask }) {

    const [ open, setOpen ] = useState();
    const [ taskName, setTaskName ] = useState('');
    const [ openForm, setOpenForm ] = useState(0);


    const openClick = (name) => {
        setOpen(name)
        setTaskName(name)
        setOpenForm(1)
    };

    const closeClick = () => {
        setOpen()
        setOpenForm(0)
    };



    useEffect(() => {
        sessionStorage.setItem('name', taskName);
    }, [taskName])
    useEffect(() => {
        sessionStorage.setItem('open', openForm);
    }, [openForm])

    




    return (
        <ListGroup>
            {todos.map((task, index) => (
                <ListGroup key={index}>
                    <ListGroupItem style={{ textDecoration: completeTask(task) ? 'line-through' : 'none' }} >
                        {index+1}....{task.name}....( {task.subdata.length} subtasks )
                        <Button size='sm' className='mx-2' variant='outline-dark' onClick={() => { openClick(task.name) }}>
                            Show Subtasks
                        </Button>
                        <Button size='sm' variant='outline-secondary' onClick={closeClick}>
                            Hide Subtasks
                        </Button>
                    </ListGroupItem>
                    {task.subdata.filter(child => child.complete === false).map((child, index) => (
                        <ListGroupItem onClick={() => { handleToggle(child.id, taskName) }} style={{ textDecoration: child.complete ? 'line-through' : '', display: open === task.name ? 'block' : 'none' }} key={index} className='mx-1'>
                            {child.name}
                        </ListGroupItem>
                    ))}
                    <ListGroupItem style={{ fontWeight: 'bold', display: open === task.name ? 'block' : 'none' }} className='mx-2'>
                        Completed Subtasks
                    </ListGroupItem>

                    {task.subdata.filter(child => child.complete === true).map((child, index) => (
                        <ListGroupItem style={{ textDecoration: child.complete ? 'line-through' : '', display: open === task.name ? 'block' : 'none' }} key={index} className='mx-2'>
                            {child.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            ))}
        </ListGroup>
    )
}

export default Todo;