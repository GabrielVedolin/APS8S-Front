import axios from 'axios';

const api = axios.create({
    baseURL_local: 'http://localhost:3333',
    baseURL: 'https://apsoito.herokuapp.com'
})

export default api;