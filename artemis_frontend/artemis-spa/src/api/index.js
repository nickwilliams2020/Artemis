import axios from 'axios'

const API_URL = process.env.API_URL

export function fetchPosts() {  
    return axios.get(`${API_URL}/posts/`)
}

export function fetchPost(id) {
    return axios.get(`${API_URL}/posts/${id}/`)
}

export function postNewPost(post, jwt) {
    return axios.post(`${API_URL}/posts/`, post, { headers: {Authorization: `Bearer: ${jwt}`}})
}

export function authenticate(userData) {
    return axios.post(`${API_URL}/login/`, userData)
}

export function register(userData) {
    return axios.post(`${API_URL}/register/`, userData)
}