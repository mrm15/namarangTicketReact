import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.js";
import {toast} from "react-toastify";
import {axiosPrivateFormData} from "../api/axios";

const useAxiosPrivateFormData = () => {
    const refresh = useRefreshToken();
    // @ts-ignore
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivateFormData.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivateFormData.interceptors.response.use(
            response => response,
            async (error) => {

                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {

                    prevRequest.sent = true;
                    const newAccessToken = await refresh();

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivateFormData(prevRequest);
                }
                if (error?.response?.status === 400) {
                    toast.error(error?.response.data.message)
                    return error

                }
                if (error?.response?.status === 401) {
                    toast.error(error?.response.data.message)
                    return error

                }
                if (error?.response?.status === 404) {
                    toast.error(error?.response.data.message)
                    return error
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivateFormData.interceptors.request.eject(requestIntercept);
            axiosPrivateFormData.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivateFormData;
}

export default useAxiosPrivateFormData;