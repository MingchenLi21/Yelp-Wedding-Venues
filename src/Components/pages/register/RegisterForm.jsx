import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useShowMsg from "../../Hooks/useShowMsg";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card'

const RegisterForm = ( { from } ) => {
    const [ isBtnLoading, setBtnLoading ] = useState( false );
    const [ validated, setValidated ] = useState( false );
    const [ newUser, setNewUser ] = useState( {
        username: "",
        email: "",
        password: ""
    } );
    const { login } = useAuth();
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


        axios.post( "/auth/register", { user: newUser } )
            .then( res => {
                console.log( res );
                showMsg( "Successfully registered!", "success", 5000 );
                login( res.data );
                navigate( from, { replace: true } );

            } ).catch( e => {
                showMsg( e.response.data );


            } ).finally( () => {
                setBtnLoading( false );
            } );
    };

    return (
        <Container className="d-flex justfy-content-center align-items-center mt-5">
            <Row>
                <Col md={ { span: 6, offset: 3 } } xl={ { span: 4, offset: 4 } }>
                    <Card>
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" />
                        <Card.Body>
                            <Card.Title>Register</Card.Title>

                            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label >Username</Form.Label>
                                    <Form.Control type="text"
                                        onChange={ ( event ) => setNewUser( { ...newUser, username: event.target.value } ) }
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

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label >Email</Form.Label>
                                    <Form.Control type="email"
                                        onChange={ ( event ) => setNewUser( { ...newUser, email: event.target.value } ) }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label >Password</Form.Label>
                                    <Form.Control type="password"
                                        onChange={ ( event ) => setNewUser( { ...newUser, password: event.target.value } ) }
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
                                        className="mb-auto"
                                        disabled={ isBtnLoading }
                                    >
                                        { isBtnLoading ? "Loading..." : "Submit" }
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

export default RegisterForm;