import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup'
import useShowMsg from "../../Hooks/useShowMsg";

const AddVenueForm = () => {
    const navigate = useNavigate();
    const [ newVenue, setNewVenue ] = useState( {
        title: "",
        location: "",
        description: "",
        price: 0
    } );
    const [ images, setImages ] = useState( null );
    const [ isBtnLoading, setBtnLoading ] = useState( false );
    const [ validated, setValidated ] = useState( false );
    const { showMsg } = useShowMsg();


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
        axios.post( "/venues", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        } )
            .then( res => {
                console.log( "new venue created!" );
                navigate( `/venues/${ res.data._id }` );

            } ).catch( e => {
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
                    <Form.Control placeholder="0.00"
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
                        onChange={ ( event ) => setNewVenue( { ...newVenue, description: event.target.value } ) }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid description.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImgURL">
                    <Form.Label >Image</Form.Label>
                    <Form.Control type="file"
                        onChange={ ( event ) => setImages( event.target.files ) }
                        multiple
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid image.
                    </Form.Control.Feedback>
                </Form.Group>


                <Button
                    type="submit"
                    variant="success"
                    disabled={ isBtnLoading }
                >
                    { isBtnLoading ? "Loading..." : "Submit" }
                </Button>
            </Form>

        </Col>
    );
};

export default AddVenueForm;