import { useParams } from "react-router-dom";
import useGet from "../../Hooks/useGet";
import Venue from "./VenueView";
import Col from "react-bootstrap/Col";
import ReviewForm from "./ReviewForm";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Reviews from "./Reviews";
import useAuth from "../../Hooks/useAuth";
import Mapbox from "./Mapbox";

const VenuePage = () => {
    const { id: VenueId } = useParams();
    const { user } = useAuth();

    const { data: venue, isLoading, error, reload } = useGet( `/venues/${ VenueId }` );

    return (
        <Container className="venue-page">
            <Row>
                <Col className="mt-3" md={ { span: 6 } }>
                    { error && <div>{ error }</ div> }
                    { isLoading && <div>Loading...</div> }

                    { venue &&
                        <Venue venue={ venue } />
                    }
                </Col>

                <Col className="mt-3" md={ { span: 6 } }>
                    { error && <div>{ error }</ div> }
                    { isLoading && <div>Loading...</div> }
                    { venue &&
                        <div>
                            <Mapbox geometry={ venue.geometry } venueTitle={ venue.title } location={ venue.location } />
                            { user && <>
                                < h2 > Leave a review</h2>
                                <ReviewForm venue={ venue } reload={ reload } />
                            </> }
                            < h2 > Reviews</h2>
                            <Reviews venue={ venue } reload={ reload } />

                        </div>
                    }

                </Col>
            </Row>
        </Container >
    );
};

export default VenuePage;