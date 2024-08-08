import axios from 'axios';


// export const BASE_URL = 'http://localhost:3001';
export const PREFIX_URL = process.env.REACT_APP_PREFIX_URL || 'http://localhost:3001';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';


try {
    const test = process?.env?.REACT_APP_URL
    console.log(test)
} catch (error) {
    console.log(error)

}
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer 111111111111111111`,

    },
    withCredentials: true,

});
export const axiosPrivateFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,

});