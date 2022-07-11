import Card from 'react-bootstrap/Card'
import useAuth from '../../Hooks/useAuth';
import DeleteReview from './DeleteReview';
import "../../../style/starability.css";

const Review = ( { review, reload } ) => {
    const { body, rating, _id: id } = review;
    const { user } = useAuth();

    return (
        <Card className='mb-3'>
            <Card.Body>

                {/* <Card.Title>Rating:</Card.Title> */}
                <p className="starability-result" data-rating={rating}></p>
                <Card.Subtitle className="mb-2 text-muted">By {review.author.username}</Card.Subtitle>
                <Card.Text>Review: { body }</Card.Text>
                { ( user && review.author._id === user._id ) && <DeleteReview reviewId={ id } reload={reload} /> }
            </Card.Body>
        </Card>
    );
};

export default Review;