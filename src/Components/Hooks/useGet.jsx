import axios from "axios";
import { useEffect, useState } from "react";

const useGet = ( url ) => {

    const [ data, setData ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ error, setError ] = useState( null );
    const [ toggle, setToggle ] = useState( false );

    const reload = () => {
        setToggle( !toggle );
    };

    useEffect( () => {

        const controller = new AbortController();
        axios.get( url, { signal: controller.signal } )
            .then( res => {
                // if ( res.status >= 400 ) {
                //     throw Error( "could not get the data for this resource" );
                // }

                setData( res.data );
                setError( null );
            } )
            .catch( error => {
                if ( error.response ) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log( error );
                    setError( error.response.data );
                } else if ( error.request ) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setError( "response received." );
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError( "Something went wrong." )
                    console.log( 'Something happened in setting up the request that triggered an Error:', error.message );
                }


                // console.log( error );

            } ).finally( () => {
                setIsLoading( false );
            } );

        return () => controller.abort(); // cancel the request when needed

    }, [ url, toggle ] );

    return { data, isLoading, error, reload };
}

export default useGet;