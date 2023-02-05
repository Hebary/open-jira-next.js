import axios from 'axios'

const baseUrl = '/api'

const entriesApi = axios.create({
    baseURL: baseUrl,

})

export default entriesApi