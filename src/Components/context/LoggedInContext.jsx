import axios from "axios";
import { useEffect, useState,  createContext } from "react";

export const LoggedInContext = createContext( null); // create a context object

export const LoggedInProvider = ( { children } ) => {
    const [user, setUser] = useState(1);

    const login = (newUser) => {
        setUser(newUser);
    };
    const logout = () => {
        setUser(null);
    };

    useEffect( () => {
        // check if the user is logged in
        axios.get( "/api/auth/isLoggedin" ).then( res => {
            if ( res.data ) {
                setUser(res.data);
            }else{
                setUser(null);
            }
        } );
    }, [] );

    return (
        <LoggedInContext.Provider value={ {
            user,
            login,
            logout
        } } >
            { children }
        </LoggedInContext.Provider>
    );
};
