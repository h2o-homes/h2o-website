import Axios from './axios'

export function fetchProject(params = {}) {
    return Axios.get('/api/project', params)
}

export function fetchCommunity(params = {}) {
    return Axios.get('/api/community', params)
}

export function findCarouselCommunity(params = {}) {
    return Axios.get('/api/community/findCarouselCommunity', params)
}

export function findNews(params = {}) {
    return Axios.get('/api/news/findNews', params)
}

export function submitContact(params = {}) {
    return Axios.post('/api/contact/submit', params, {})
}
