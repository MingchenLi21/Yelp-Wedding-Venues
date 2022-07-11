import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import MyAlert from "./Alert";
import Footer from "./Footer";
const Layout = () => {
    return (
        <Container fluid>
            <NavBar />
            <MyAlert />
            <div className="mt-3" /> 
            <main>
                <Outlet/>
            </main>
            <Footer />
        </Container>
    );
};

export default Layout;