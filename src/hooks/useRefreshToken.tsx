import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    // @ts-ignore
    const { setAuth } = useAuth();

    const refresh = async () => {

        const response = await axios.get('/refresh', {
            withCredentials: true
        });
         
        setAuth(prev => {
            //console.log(JSON.stringify(prev));
            //console.log(response.data.accessToken);
            return {
                ...prev,
                userInfo: response.data.userInfo,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
