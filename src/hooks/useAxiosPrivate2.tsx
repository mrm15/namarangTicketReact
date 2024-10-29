import { axiosPrivate } from "../api/axios";
import { useEffect, useCallback } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.js";
import { toast } from "react-toastify";
import axios, { CancelTokenSource } from "axios";

const useAxiosPrivate2 = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const source = axios.CancelToken.source(); // Create cancel token source

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.cancelToken = source.token; // Attach cancel token to each request
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                // Error handling based on status codes
                const status = error?.response?.status;
                const errorMessage = error?.response?.data?.message || error?.response?.data?.error?.message;
                if ([400, 401, 403, 404, 409, 500].includes(status)) {
                    toast.error(errorMessage || "An error occurred.");
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );

        // Cleanup function to cancel ongoing requests and eject interceptors on unmount
        return () => {
            source.cancel("Request canceled by the user."); // Cancel any ongoing requests
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    // Function to create a new request with its own cancel token
    const getCancelableRequest = useCallback(() => {
        const cancelSource = axios.CancelToken.source();
        return {
            axiosInstance: axiosPrivate,
            cancelToken: cancelSource.token,
            cancel: () => cancelSource.cancel("Operation canceled by the user.")
        };
    }, []);

    return { axiosPrivate, getCancelableRequest };
};

export default useAxiosPrivate2;
