import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import useShowMsg from "../../Hooks/useShowMsg";

const DeleteReview = ( { reviewId, reload } ) => {

    const { id: VenueId } = useParams();
    const {showMsg} = useShowMsg();

    const handleDelete = () => {
        axios.delete( `/venues/${ VenueId }/reviews/${ reviewId }` )
            .then( res => {
                showMsg( "Review deleted", "success", 4000 );

            } ).catch( e => {
                showMsg( e.response.data, "Error" );
                
            } ).finally(()=>{
                reload();
            });
    };


    return (
        <Button variant="danger"
            onClick={ handleDelete }
        >
            Delete
        </Button>
    );
};

export default DeleteReview;