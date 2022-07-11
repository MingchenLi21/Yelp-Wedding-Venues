import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";

const NoPermission = ({VenueId})=>{
    return (
        <Alert variant="warning">
            You don't have permission to do this!
            <Link calssName="alert-link" to={`/venues/${VenueId}`}> Go Back </Link>
        </Alert>
    );
};

export default NoPermission;