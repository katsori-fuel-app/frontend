import axios from 'axios';

export const fuelWebInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json',
    },
});
