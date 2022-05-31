import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { BsGithub } from "react-icons/bs";
import { useState, } from 'react'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import auth from "../firebase/index"






function Login() {

    const [isSignin, setIsSignin] = useState(false)
    const [signinData, setSigninData] = useState({})




    const signInWithGithub = () => {
        const provider = new GithubAuthProvider();
        provider.addScope('public_repo,read:org,read:user');

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {

                const credential = GithubAuthProvider.credentialFromResult(result);
                const user = result.user;
                setIsSignin(true)
                setSigninData(user)
                localStorage.setItem('userData', JSON.stringify(user));
                window.location.href = "../home";

            }).catch((error) => {
                console.log("error",error)
            });

    }




    return (

        <Card className="mx-auto mt-5" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title className='text-center'>My App</Card.Title>
                <Button className='mx-4' variant="dark" onClick={signInWithGithub}>
                    <BsGithub /> LOGIN WITH GITHUB
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Login
