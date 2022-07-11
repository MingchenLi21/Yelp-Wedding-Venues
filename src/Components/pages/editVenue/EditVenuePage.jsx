import { useParams } from "react-router-dom";
import useGet from "../../Hooks/useGet";
import useAuth from "../../Hooks/useAuth";
import EditVenueForm from "./EditVenueForm";
import NoPermission from "./NoPermission";

const EditVenuePage = () => {
    const { id: VenueId } = useParams();
    const { data: venue, isLoading, error } = useGet( `/venues/${ VenueId }` );
    const { user } = useAuth();

    return (
        < div className="edit-venues-page" >

            <h1 className="text-center">Edit Venue</h1>
            { error && <div>{ error }</ div> }
            { isLoading && <div>Loading...</div> }

            { ( venue && user && venue.author._id === user._id ) ? 
             <EditVenueForm venue={ venue } /> : <NoPermission VenueId={ VenueId } />}

        </div >
    );
}

export default EditVenuePage;