import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const response = await axios.get('/refresh', {
                    withCredentials: true
                });

                setAuth(prev => ({
                    ...prev,
                    userInfo: response.data.userInfo,
                    accessToken: response.data.accessToken
                }));
                return response.data.accessToken;
            } catch (error) {
                attempts++;
                if (attempts === maxAttempts) {
                    // Handle the error after 3 attempts
                    console.error("Failed to refresh token:", error);
                    throw error; // or handle the error as needed
                }
            }
        }
    };

    return refresh;
};

export default useRefreshToken;
