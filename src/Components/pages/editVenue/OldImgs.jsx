import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

const OldImgs = ( { imgs, deleteImg, setDeleteImg } ) => {

    const handleClick = ( value, idx ) => {
        const newState = [ ...deleteImg ];
        newState[ idx ] = value;
        setDeleteImg( newState );

    };

    return (
        <Row className="row-cols-3">
            {
                imgs.map( ( img, idx ) => < div key={ `img-${ idx }` } >
                    <Image src={ img.thumbnail } thumbnail />
                    <Form.Check id={ `img-${ idx }` } label="Delete ?" onClick={ ( e ) => { handleClick( e.target.checked, idx ); console.log( e.target.checked ); } } />
                </div> )
            }
        </Row>
    );
};

export default OldImgs;