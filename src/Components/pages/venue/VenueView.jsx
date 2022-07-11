import axios from "axios";
import DeleteBtn from "./DeleteBtn";
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import useAuth from "../../Hooks/useAuth";
import ImgSlide from "./ImgSlide";


const Venue = ( props ) => {
    const navigate = useNavigate();
    const { venue } = props;
    const { user } = useAuth();

    const handleDelete = () => {
        axios.delete( `/venues/${ venue._id }` )
            .then( res => {
                navigate( "/venues" );
            } );
    };

    return (
        <Card className="mb-3">
            <ImgSlide images={venue.images}/>

            <Card.Body>
                <Card.Title>{ venue.title }</Card.Title>
                <Card.Text>{ venue.description }</Card.Text>
            </Card.Body>

            <ListGroup variant="flush">
                <ListGroup.Item className="text-muted">{ venue.location }</ListGroup.Item>
                <ListGroup.Item >Submitted by { venue.author.username }</ListGroup.Item>
                <ListGroup.Item>${ venue.price }/day</ListGroup.Item>
                { user && venue.author._id === user._id && <ListGroup.Item>
                    <Link to="./edit">
                        <Button variant="warning">Edit</Button>
                    </Link>
                    { '  ' }
                    <DeleteBtn handleDelete={ handleDelete } />
                </ListGroup.Item> }
            </ListGroup>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
};

export default Venue;