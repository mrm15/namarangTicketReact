import {useContext, useDebugValue} from "react";
import AuthContext from "../context/AuthProvider";

interface authInterFace {
    name?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    province?: string;
    city?: string;
    address?: string;
    user?: any;
    [key: string]: any; // Index signature


}

const useAuth = () => {

    const {auth} =  useContext(AuthContext) as { auth: authInterFace }
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;