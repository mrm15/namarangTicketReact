import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";
import Loader from "./Loader";
import {PAGES} from "../Pages/Route-string.tsx";
import FullLoader from "./Loader/FullLoader.tsx";

const PersistLogin = () => {

    const myLocation = useLocation()
    const navigateTo = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // @ts-ignore
    const {auth} = useAuth();
    const [persist] = useLocalStorage('persist', false);


    // @ts-ignore
    useEffect(() => {


        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log("رفرش توکن مورد تایید نیست.");
                navigateTo(PAGES.LOGIN, {state:{from:myLocation}})
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        if (!auth.accessToken) {
            setIsLoading(true)
            void verifyRefreshToken()
        } else {
            setIsLoading(false)
        }

        return () => isMounted = false;
    }, [])


    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading
                    ? <FullLoader/>
                    : <Outlet/>
            }
        </>
    )
}

export default PersistLogin