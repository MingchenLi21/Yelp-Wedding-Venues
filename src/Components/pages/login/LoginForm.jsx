import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useShowMsg from "../../Hooks/useShowMsg";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card'


const LoginForm = ( { from } ) => {

    const { login } = useAuth();
    const [ isBtnLoading, setBtnLoading ] = useState( false );
    const [ validated, setValidated ] = useState( false );
    const [ username, setUsername ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const { showMsg } = useShowMsg();
    const navigate = useNavigate();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        setValidated( true );
        const form = event.currentTarget;

        if ( form.checkValidity() === false ) {
            event.stopPropagation();
            return;
        }
        setBtnLoading( true );
        const user = {
            username,
            password
        }
        axios.post( "/api/auth/login", user )
            .then( res => {
                setBtnLoading( false );
                console.log(res);
                const user = res.data;
                login( user );
                showMsg( "welcom back!", "success", 5000 );
                navigate( from, { replace: true } );

            } ).catch( e => {
                setBtnLoading( false );

                if ( e.response.statusText === "Unauthorized" ) {
                    e.response.data = "password or username is incorrect!";
                }

                showMsg( e.response.data );
            } );
    };

    return (
        <Container className="d-flex justfy-content-center align-items-center mt-5">
            <Row>
                <Col md={ { span: 6, offset: 3 } } xl={ { span: 4, offset: 4 } }>
                    <Card>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />
                        <Card.Body>
                            <Card.Title>Login</Card.Title>

                            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label >Username</Form.Label>
                                    <Form.Control type="text"
                                        onChange={ ( event ) => setUsername( event.target.value ) }
                                        required
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid username.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label >Password</Form.Label>
                                    <Form.Control type="password"
                                        onChange={ ( event ) => setPassword( event.target.value ) }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid password.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        size="lg"
                                        className="btn-block"
                                        disabled={ isBtnLoading }
                                    >
                                        { isBtnLoading ? "Loading..." : "Login" }
                                    </Button>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;