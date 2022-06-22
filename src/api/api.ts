import { AxiosError, AxiosResponse } from 'axios'

import { ModelsRedux } from 'types'
import { $host, $authHost } from '../common/axios'

const API = {
    apiGet: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        mock?: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        ) => void,
    ) => {
        if (mock) {
            mock(success, failure)

            return
        }

        const apiData: string[] = []

        for (const key in data) {
            apiData.push(`${key}=${data[key]}`)
        }

        return $host
            .get(`${url}?${apiData.join('&')}`)
            .then((res: AxiosResponse<R>) => success(res))
            .catch((err: AxiosError<ModelsRedux.IServerError>) => {
                if (err.response && err.response.status !== 200) {
                    failure(err.response)
                }
            })
    },
    apiPost: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        mock?: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        ) => void,
    ) => {
        if (mock) {
            mock(success, failure)

            return
        }

        return $host
            .post(url, data ? data : undefined)
            .then((res: AxiosResponse<R>) => success(res))
            .catch((err: AxiosError<ModelsRedux.IServerError>) => failure(err.response))
    },
}

const API_HOST = {
    apiGet: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        mock?: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        ) => void,
    ) => {
        if (mock) {
            mock(success, failure)

            return
        }

        const apiData: string[] = []

        for (const key in data) {
            apiData.push(`${key}=${data[key]}`)
        }

        return $authHost
            .get(`${url}?${apiData.join('&')}`)
            .then((res: AxiosResponse<R>) => success(res))
            .catch((err: AxiosError<ModelsRedux.IServerError>) => failure(err.response))
    },
    apiPost: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        mock?: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        ) => void,
    ) => {
        if (mock) {
            mock(success, failure)

            return
        }

        return $authHost
            .post(url, data ? data : undefined)
            .then((res: AxiosResponse<R>) => success(res))
            .catch((err: AxiosError<ModelsRedux.IServerError>) => failure(err.response))
    },
    apiPut: async <D, R>(
        url: string,
        data: D,
        success: (response: AxiosResponse<R>) => void,
        failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        mock?: (
            success: (response: AxiosResponse<R>) => void,
            failure: (response: AxiosResponse<ModelsRedux.IServerError> | undefined) => void,
        ) => void,
    ) => {
        if (mock) {
            mock(success, failure)

            return
        }

        return $authHost
            .put(url, data ? data : undefined)
            .then((res: AxiosResponse<R>) => success(res))
            .catch((err: AxiosError<ModelsRedux.IServerError>) => failure(err.response))
    },
}

export { API, API_HOST }
