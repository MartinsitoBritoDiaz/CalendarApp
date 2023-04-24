import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL: CalendarAPI } = getEnvVariables();

const calendarAPI = axios.create({
    baseURL: CalendarAPI
});

calendarAPI.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
})

export default calendarAPI;

