import { useContext } from "react";
import { LoggedInContext } from "../context/LoggedInContext";

const useAuth = () => {
    return useContext( LoggedInContext );
};

export default useAuth;