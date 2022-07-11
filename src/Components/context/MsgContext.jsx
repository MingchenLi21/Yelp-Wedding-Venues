import { createContext, useState } from "react";

export const MsgContext = createContext(); // create a context object

export const MsgProvider = ( { children } ) => {

    const [ msg, setMsg ] = useState( {
        alertMsg: "Warning",
        alertType: "danger",
        showAlert: false
    } );
    const dismiss = () => {
        setMsg( { ...msg, showAlert: false } );
    };
    const showMsg = ( newMsg, type = "danger", duration ) => {
        setMsg( {
            alertMsg: newMsg,
            alertType: type,
            showAlert: true
        } );

        if ( duration ) {
            setTimeout( () => {
                dismiss();
            }, duration );
        };

    };

    return (
        <MsgContext.Provider value={ {
            msg,
            showMsg,
            dismiss
        } } >
            { children }
        </MsgContext.Provider>
    );
};
