import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const homePageStyle = {
        backgroundImage: `url(${process.env.REACT_APP_DEFAULT_BACKGROUND_IMG})`,
        height: "100vh",
        "backgroundSize": "cover",
        "backgroundPosition": "center",
        "textShadow": "0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)",
        "boxShadow": "inset 0 0 5rem rgba(0, 0, 0, 0.5)",
    };
    const navigate = useNavigate();

    return (
        <div className="home-page" style={ homePageStyle }>
            <Container className=" w-100 h-50 p-3 mx-auto align-items-center justify-content-center d-flex" >

                    <p className="lead"> Welcome to YelpVenues! <br /> Jump right in and explore our many wedding venues. <br />
                        Feel free to share some of your own and comment on others!</p>

                    <Button variant="secondary"
                     size="lg" 
                     className="font-weight-bold border-white"
                     onClick={() => {navigate("venues")}}
                     >
                        ViewVenues
                        </Button>

            </Container>
        </div>
    );
};

export default Home;