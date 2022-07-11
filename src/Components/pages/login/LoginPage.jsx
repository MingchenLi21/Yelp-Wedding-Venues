import LoginForm from "./LoginForm"
import LoginFirst from "./LoginFirst";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LogoutFirst from "./LogoutFirst";
const LoginPage = () => {
    const { user } = useAuth();

    const location = useLocation();
    let from = location.state?.from?.pathname;

    if (!from || location.pathname === from || from === "/register"){
        from = "/";
    }
    if ( user ) {
        return ( <LogoutFirst /> );
    }


    return ( <>
        { location.state?.showWarning && <LoginFirst from={ from } /> }
        <LoginForm from={ from } />
    </> );
};

export default LoginPage;