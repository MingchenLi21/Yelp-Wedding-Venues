import Container from 'react-bootstrap/Container'
import Review from './Review';

const Reviews = ( { venue, reload } ) => {

    const { reviews } = venue;

    return (
        <Container>
            { reviews.map( review => <Review review={ review } key={ review._id } reload={reload} /> ) }
        </Container>
    );
};

export default Reviews;