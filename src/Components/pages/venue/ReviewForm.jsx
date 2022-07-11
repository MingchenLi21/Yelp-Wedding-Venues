import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import useShowMsg from "../../Hooks/useShowMsg";

const ReviewForm = ( { venue, reload } ) => {

    const [ review, setReview ] = useState( {
        body: "",
        rating: 3,
    } );

    const [ validated, setValidated ] = useState( false );
    const [ isBtnLoading, setBtnLoading ] = useState( false );
    const { showMsg } = useShowMsg();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated( true );
        const form = event.currentTarget;

        if ( form.checkValidity() === false ) {
            return;
        }

        setBtnLoading( true );

        axios.post( `/venues/${ venue._id }/reviews`, { review } )
            .then( res => {
                reload();

                setReview( {
                    body: "",
                    rating: 3
                } );

                setValidated( false );
                showMsg( "Sucessfully created a new review!",
                    "success",
                    3000
                );


            } ).catch( e => {
                showMsg( e.response.data );

            } ).finally( () => {
                setBtnLoading( false );
            } );
    };
    return (
        <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Label>Rating: { review.rating }</Form.Label>
            <Form.Range
                className="mb-3"
                min="1" max="5"
                defaultValue={ review.rating }
                required
                onChange={ ( event ) => setReview( { ...review, rating: event.target.value } ) }
            />

            <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={ { height: '100px' } }
                required
                value={ review.body }
                onChange={ ( event ) => setReview( { ...review, body: event.target.value } ) }
            />
            <Form.Control.Feedback type="invalid">
                Please provide a review.
            </Form.Control.Feedback>

            <Button
                className="mt-3"
                type="submit"
                variant="success"
                disabled={ isBtnLoading }
            >
                { isBtnLoading ? "Loading..." : "Submit" }
            </Button>
        </Form>
    );
};

export default ReviewForm;