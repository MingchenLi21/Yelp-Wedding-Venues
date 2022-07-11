import Alert from 'react-bootstrap/Alert'

const NoPermission = ({VenueId})=>{
    return (
        <Alert variant="warning">
            You don't have permission to do this!
            <Alert.Link href={`/venues/${VenueId}`}> Go Back </Alert.Link>
        </Alert>
    );
};

export default NoPermission;