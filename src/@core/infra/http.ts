import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:25000'
    // baseURL: 'http://10.20.8.195:25000/'
});