import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"

const RequireAuth = ( { children } ) => {
    const { user} = useAuth();
    const location = useLocation();

    if ( !user ) {
        return <Navigate to="/login" replace state={ { from: location, showWarning:true } } />
    };

    return children;
};

export default RequireAuth;
