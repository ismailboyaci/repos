import React from 'react'
import { useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { useEffect } from 'react';


function Todo({ todos, handleToggle, completeTask, unHandleToggle }) {

    const [open, setOpen] = useState();
    const [taskName, setTaskName] = useState('');
    const [openForm, setOpenForm] = useState(0);
    const [editIndex, setEditIndex]= useState(null); 


    const openClick = (name,index) => {
        setOpen(name)
        setTaskName(name)
        setOpenForm(1)
        setEditIndex(editIndex => editIndex === index ? null : index)
    };

    const closeClick = () => {
        setOpen()
        setOpenForm(0)
        setEditIndex(null)
    };



    useEffect(() => {
        sessionStorage.setItem('name', taskName);
    }, [taskName]);
    useEffect(() => {
        sessionStorage.setItem('open', openForm);
    }, [openForm]);





    return (
        <ListGroup>
            {todos.map((task, index) => (
                <ListGroup key={index} >
                    <ListGroupItem style={{ textDecoration: completeTask(task) ? 'line-through' : 'none',display: (editIndex === index || editIndex === null) ? 'block':'none'}} >
                        {index + 1}....{task.name}....( {task.subdata.length} subtasks )
                        <Button size='sm' className='btn1' variant='outline-secondary' onClick={closeClick}>
                            Hide Subtasks
                        </Button>
                        <Button size='sm' className='mx-2 btn1' variant='outline-dark' onClick={() => { openClick(task.name,index) }}>
                            Show Subtasks
                        </Button>
                    </ListGroupItem>
                    {task.subdata.filter(child => child.complete === false).map((child, index) => (
                        <ListGroupItem style={{ textDecoration: child.complete ? 'line-through' : '', display: open === task.name ? 'block' : 'none' }} key={index} className='mx-1'>
                            {child.name}
                            <Button size='sm' className='mx-5 btn1' variant='outline-dark' onClick={() => { handleToggle(child.id, taskName) }}>
                                {<BsCheckLg />}
                            </Button>
                        </ListGroupItem>
                    ))}
                    <ListGroupItem style={{ fontWeight: 'bold', display: open === task.name ? 'block' : 'none' }} className='mx-2'>
                        Completed Subtasks
                    </ListGroupItem>

                    {task.subdata.filter(child => child.complete === true).map((child, index) => (
                        <ListGroupItem style={{ textDecoration: child.complete ? 'line-through' : '', display: open === task.name ? 'block' : 'none' }} key={index} className='mx-2'>
                            {child.name}
                            <Button size='sm' className='mx-5 btn1' variant='outline-dark' onClick={() => { unHandleToggle(child.id, taskName) }}>
                                {<BsXLg />}
                            </Button>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            ))}
        </ListGroup>
    )
}

export default Todo;