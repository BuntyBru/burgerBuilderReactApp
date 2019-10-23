import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerbui.firebaseio.com/'
});

export default instance;
