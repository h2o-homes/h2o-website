import Axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const whiteListCodes = {
    106: 'Please Login'
}

function showError(_tip) {
    message.error(_tip, 3)
}

const service = Axios.create({
    timeout: 30000
})

service.interceptors.request.use(async (config) => {
    if (process.env.NODE_ENV === 'development') {
        config.url = `${config.url}`
    }
    return config
})

const get = (path, params) => {
    return service
        .get(path, { params })
        .then((resp) => {
            const data = resp.data
            const { code, msg } = data
            if (resp.status === 200) {
                if (code === 1) {
                    return Promise.resolve(data)
                } else {
                    if (!whiteListCodes[code]) {
                        showError(msg)
                    }
                    return Promise.resolve(data)
                }
            } else {
                return Promise.reject(new Error(resp.data.msg))
            }
        })
        .catch((err) => {
            let __emsg = err.message || ''
            return Promise.reject(new Error(__emsg))
        })
}

const post = (path, data) => {
    return service
        .post(path, qs.stringify(data))
        .then((resp) => {
            const data = resp.data
            const { code, msg } = data
            if (resp.status === 200)
                if (code === 1) return Promise.resolve(data)
                else {
                    if (!whiteListCodes[code]) {
                        showError(msg)
                    }
                    return Promise.resolve(data)
                }
        })
        .catch((err) => {
            let __emsg = err.message || ''
            return Promise.reject(new Error(__emsg))
        })
}

export default {
    get,
    post
}
