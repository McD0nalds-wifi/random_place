import axios, { AxiosRequestConfig } from 'axios'

import * as constants from '../common/constants'

const $host = axios.create({
    baseURL: constants.isDevMode ? 'http://localhost:5000/' : 'https://random-place-server.ru/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

const $authHost = axios.create({
    baseURL: constants.isDevMode ? 'http://localhost:5000/' : 'https://random-place-server.ru/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

$authHost.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.headers) {
            config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
        }

        return config
    },

    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401) {
            try {
                const response = await axios.get(
                    constants.isDevMode
                        ? 'http://localhost:5000/api/user/refresh'
                        : 'https://random-place-server.ru/api/user/refresh',
                    {
                        withCredentials: true,
                    },
                )
                localStorage.setItem('token', response.data.accessToken)
                return $authHost.request(originalRequest)
            } catch (error) {
                // console.log('Не авторизован')
            }
        }
    },
)

export { $host, $authHost }
