import axios from 'axios';

const localhost = 'http://localhost:4000/'
const vdsServer = 'http://91.107.120.104:3000/'
const baseURL = process.env.NEXT_PUBLIC_IS_REMOTE_BACK === 'remote' ? vdsServer : localhost;

export const fuelWebInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
