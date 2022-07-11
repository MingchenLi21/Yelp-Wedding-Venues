import useGet from "../../Hooks/useGet";
import VenuesList from "./VenueList";
import Container from 'react-bootstrap/Container';
import ClusterMap from "./ClusterMap";


const VenuesPage = () => {
    const { data: venues, isLoading, error } = useGet( "/api/venues" );

    return (
        <div className="venues-page">

            { error && <div>{ error }</ div> }
            { isLoading && <div>Loading...</div> }

            { venues && <Container>
                <ClusterMap venues={ venues } />
                <h1>All Venues</h1>
                <VenuesList venues={ venues } />
            </Container>
            }
        </div>
    );
};

export default VenuesPage;