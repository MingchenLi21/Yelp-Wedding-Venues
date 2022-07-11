import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import axios from "axios";
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import useAuth from './Hooks/useAuth';
import { useLocation } from 'react-router-dom';
import {  Link } from "react-router-dom";

const NavBar = () => {

    const { user, logout } = useAuth();
    const location = useLocation();

    const handleClick = () => {
        axios.post( "/api/auth/logout" ).then( res => {
            logout();
        } );

    };

    return (
        <Navbar bg="light" sticky="top" className='shadow-5-strong'>
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>YelpVenues</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <Link to="/" className="text-decoration-none nav-link" >Home</Link>
                    <Link to="/venues" className="text-decoration-none nav-link" >Venues</Link>
                    <Link to="/new" className="text-decoration-none nav-link" >New Venue</Link>
                </Nav>
                <Nav className="ml-auto">
                    { !user ? <>
                        <Link to="/login" className="text-decoration-none nav-link" state={ { from: location } }>Login</Link>
                        <Link to="/register" className="text-decoration-none nav-link" state={ { from: location } }>register</Link>
                    </> : <Button className='text-decoration-none nav-link' as='button' variant="light"
                        onClick={ handleClick }
                    >Logout</Button>
                    }
                </Nav>

            </Container>
        </Navbar>
    );
};

export default NavBar;