import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.js";
import {toast} from "react-toastify";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    // @ts-ignore
    const { auth } = useAuth();
 
    useEffect(() => {
        const controller = new AbortController();
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.signal = controller.signal;
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {

                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                if(error?.response?.status === 400){
                    toast.error(error?.response.data.message)
                    return error

                }
                if(error?.response?.status === 401){
                    toast.error(error?.response.data.message)
                    return error

                }
                if(error?.response?.status === 403){
                    toast.error(error?.response.data.message)
                    return error

                }
                if(error?.response?.status === 404){
                    toast.error(error?.response.data.message)
                    return error
                }
                if(error?.response?.status === 409){
                    toast.error(error?.response.data.message);

                    return error
                }
                if(error?.response?.status === 500){

                    // toast.error(error?.response.data.message);
                    toast.error(error?.response?.data?.error?.message)
                    // toast.error(error?.toString())
                    toast.error(error?.response?.data?.error);
                    return error
                }
                return Promise.reject(error);
            }
        );

        return () => {
            controller.abort()
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;