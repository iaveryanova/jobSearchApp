import axios from "axios";

const xSecretKey = process.env.REACT_APP_X_SECRET_KEY;
const xApiAppId = process.env.REACT_APP_X_API_APP_ID;


export default axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    headers:{
        'x-secret-key': `${xSecretKey}`,
        'X-Api-App-Id': `${xApiAppId}`
    }
})