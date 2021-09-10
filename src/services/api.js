import Axios from 'axios';

const api = Axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    config: {
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }
});

export default api;