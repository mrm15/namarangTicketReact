import axios from 'axios';

const BASE_URL = 'http://localhost:3050';
// const BASE_URL = 'https://nodejs-6mbttd.chbk.run';


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