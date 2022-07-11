import VenueItem from "./VenueItem";


const VenuesList = ( props ) => {

    return (
        <>
            { props.venues.map( venue => <VenueItem venue={ venue } key={ venue._id } /> ) }
        </>
    );
};

export default VenuesList;