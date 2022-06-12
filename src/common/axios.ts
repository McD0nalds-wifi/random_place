import axios, { AxiosRequestConfig } from 'axios'

const $host = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5000/',
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
    // @ts-ignore
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401) {
            try {
                const response = await axios.get('http://localhost:5000/api/user/refresh', {
                    withCredentials: true,
                })
                localStorage.setItem('token', response.data.accessToken)
                return $authHost.request(originalRequest)
            } catch (error) {
                console.log('Не авторизован')
            }
        }
    },
)

export { $host, $authHost }
