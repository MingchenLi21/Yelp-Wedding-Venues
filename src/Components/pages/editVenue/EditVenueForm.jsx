import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import useShowMsg from "../../Hooks/useShowMsg";
import OldImgs from "./OldImgs";

const EditVenueForm = ( { venue } ) => {
    const navigate = useNavigate();
    const [ newVenue, setNewVenue ] = useState( {
        title: venue.title,
        location: venue.location,
        description: venue.description,
        price: venue.price
    } );
    const [ images, setImages ] = useState( null );

    const [ isBtnLoading, setBtnLoading ] = useState( false );
    const [ validated, setValidated ] = useState( false );
    const { showMsg } = useShowMsg();
    const [deleteImg, setDeleteImg] = useState(
        new Array(venue.images.length).fill(false)
    );

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        setValidated( true );
        const form = event.currentTarget;

        if ( form.checkValidity() === false ) {
            event.stopPropagation();
            return;
        }

        setBtnLoading( true );

        const formData = new FormData();
        Object.entries( newVenue ).forEach( e => formData.append( e[ 0 ], e[ 1 ] ) );

        if ( images ) {
            for ( let i = 0; i < images.length; i++ ) {
                formData.append( "images", images.item( i ) );
            }
        }

        deleteImg.forEach((e, idx) => {e && formData.append("deleteImages", venue.images[idx].filename)});

        axios.patch( `/venues/${ venue._id }`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        } )
            .then( res => {

                showMsg("Venue updated!", "success", 5000);
                navigate( `/venues/${ venue._id }`, { replace: true } );

            } ).catch( e => {

                if ( e.response.statusText === "Unauthorized" ) {
                    e.response.data = "password or username is incorrect!";
                }

                showMsg( e.response.data );
            } ).finally( () => {
                setBtnLoading( false );
            } );
    };

    return (
        <Col md={ { span: 6, offset: 3 } }>
            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="formVenueTitle">
                    <Form.Label >Title</Form.Label>
                    <Form.Control type="text"
                        defaultValue={ newVenue.title }
                        onChange={ ( event ) => setNewVenue( { ...newVenue, title: event.target.value } ) }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid title.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formVenueLocation">
                    <Form.Label >Location</Form.Label>
                    <Form.Control type="text"
                        defaultValue={ newVenue.location }
                        onChange={ ( event ) => setNewVenue( { ...newVenue, location: event.target.value } ) }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Location.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        defaultValue={ newVenue.price }
                        type="number"
                        aria-label="Amount (to the nearest dollar)"
                        onChange={ ( event ) => setNewVenue( { ...newVenue, price: event.target.value } ) }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid price.
                    </Form.Control.Feedback>
                </InputGroup>

                <Form.Group className="mb-3" controlId="formVenueDescription">
                    <Form.Label >Description</Form.Label>
                    <Form.Control rows={ 3 } as="textarea"
                        defaultValue={ newVenue.description }
                        onChange={ ( event ) => setNewVenue( { ...newVenue, description: event.target.value } ) }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImgURL">
                    <Form.Label >add Images</Form.Label>
                    <Form.Control type="file"
                        onChange={ ( event ) => setImages( event.target.files ) }
                        multiple
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid image url.
                    </Form.Control.Feedback>
                </Form.Group>

                <OldImgs imgs={venue.images} deleteImg={deleteImg} setDeleteImg={setDeleteImg}/>

                <Button variant="info"
                    className="mb-3"
                    type="submit"
                    disabled={ isBtnLoading }
                >
                    { isBtnLoading ? "Loading..." : "Update" }
                </Button>

            </Form>
            <Link to={ `../venues/${ venue._id }` }>Back to Venue</Link>
        </Col>
    );
};

export default EditVenueForm;