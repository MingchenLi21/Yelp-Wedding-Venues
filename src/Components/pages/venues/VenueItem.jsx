import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

const VenueItem = ( props ) => {
    const { venue } = props;
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={venue.images.length ? venue.images[0].url : process.env.REACT_APP_DEFAULT_IMG_ADDRESS} /> 
            <Card.Body>
                <Card.Title>{venue.title}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
                <Card.Text><small className="text-muted">{venue.location}</small></Card.Text>
                <Link to={`/venues/${venue._id}`}><Button>{`View ${venue.title}`}</Button></Link>
            </Card.Body>
        </Card>
    );

};

export default VenueItem;