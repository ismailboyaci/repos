import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import TodoList from '../components/TodoList'



const Home = () => {

    


    const userData = JSON.parse(localStorage.getItem('userData'));
    const [repoData, setRepoData] = useState();
    



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
                    <TodoList />
                </Col>
            </Row>
        </Container>

    )
}


export default (Home);