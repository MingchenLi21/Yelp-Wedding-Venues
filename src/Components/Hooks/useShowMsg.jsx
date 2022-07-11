import { useContext } from "react";
import { MsgContext } from "../context/MsgContext";

const useShowMsg = () => {
    return useContext( MsgContext );
};

export default useShowMsg;