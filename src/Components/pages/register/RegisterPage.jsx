import { useLocation } from "react-router-dom";
import RegisterForm from "./RegisterForm"
const RegisterPage = ()=>{
    const location = useLocation();
    let from = location.state?.from?.pathname;

    if (!from || location.pathname === from || from === "/login"){
        from = "/";
    }
    return (
        <RegisterForm from={ from }/>
    );
};

export default RegisterPage;