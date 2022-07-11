import Container from "react-bootstrap/Container";
import "../style/footer.css"
const Footer = () => {
    return (
        <div >
            <Container fluid className="footer bg-light py-2 mt-4 ">
                <span className="text-muted">&copy;Best Venues 2022</span>
            </Container>
        </div>


    );
};

export default Footer;