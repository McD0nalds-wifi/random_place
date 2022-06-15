import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { ModelsRedux } from 'types'

import authorizationReducer, { AuthorizationThunkType } from '../reducers/authorization-reducer'

import * as util from '../../common/util'
import * as constants from '../../common/constants'
import { API, API_HOST } from '../../api/api'

/* START - Authorization additional imports and module code. */

/**
 * Thunk change login email field
 *
 * @param {string} value email field value
 */
export const performInputLoginEmailField =
    (value: string): AuthorizationThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputLoginEmailField before execute code. */
        /* END - thunk performInputLoginEmailField before execute code. */

        dispatch(authorizationReducer.actions.performInputLoginEmailField(value))

        /* START - thunk performInputLoginEmailField after execute code. */
        const reducerState = getState().authorization

        if (reducerState.loginEmailFieldError) {
            dispatch(performInputLoginEmailFieldError(value))
        }
        /* END - thunk performInputLoginEmailField after execute code. */
    }

/**
 * Thunk change login email error field
 *
 * @param {string} value email field value
 */
export const performInputLoginEmailFieldError =
    (value: string): AuthorizationThunkType =>
    async (dispatch, getState) => {
        /* START - thunk performInputLoginEmailFieldError before execute code. */
        /* END - thunk performInputLoginEmailFieldError before execute code. */
        const reducerState = getState().authorization

        if (!constants.emailRegex.test(value)) {
            if (!reducerState.loginEmailFieldError) {
                dispatch(authorizationReducer.actions.performInputLoginEmailFieldError('Некорректный почтовый адрес'))
            }
        } else if (reducerState.loginEmailFieldError) {
            dispatch(authorizationReducer.actions.performInputLoginEmailFieldError(null))
        }
        /* START - thunk performInputLoginEmailFieldError after execute code. */
        /* END - thunk performInputLoginEmailFieldError after execute code. */
    }

/**
 * Thunk change login password field
 *
 * @param {string} value password field value
 */
export const performInputLoginPasswordField =
    (value: string): AuthorizationThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputLoginPasswordField before execute code. */
        /* END - thunk performInputLoginPasswordField before execute code. */

        dispatch(authorizationReducer.actions.performInputLoginPasswordField(value))

        /* START - thunk performInputLoginPasswordField after execute code. */
        const reducerState = getState().authorization

        if (reducerState.loginPasswordFieldError) {
            dispatch(performInputLoginPasswordFieldError(value))
        }
        /* END - thunk performInputLoginPasswordField after execute code. */
    }

/**
 * Thunk change login password error field
 *
 * @param {string} value password field value
 */
export const performInputLoginPasswordFieldError =
    (value: string): AuthorizationThunkType =>
    async (dispatch, getState) => {
        /* START - thunk performInputLoginPasswordFieldError before execute code. */
        /* END - thunk performInputLoginPasswordFieldError before execute code. */
        const reducerState = getState().authorization

        if (!value) {
            dispatch(authorizationReducer.actions.performInputLoginPasswordFieldError('Введите пароль'))
        } else if (reducerState.loginPasswordFieldError) {
            dispatch(authorizationReducer.actions.performInputLoginPasswordFieldError(null))
        }
        /* START - thunk performInputLoginPasswordFieldError after execute code. */
        /* END - thunk performInputLoginPasswordFieldError after execute code. */
    }

/**
 * Thunk check all login fields and then call login request
 */
export const performLoginFormSubmit = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk performLoginFormSubmit before execute code. */
    /* END - thunk performLoginFormSubmit before execute code. */
    const reducerState = getState().authorization

    if (reducerState.loginEmailField.trim() === '' || reducerState.loginPasswordField.trim() === '') {
        dispatch(performInputLoginEmailFieldError(reducerState.loginEmailField))
        dispatch(performInputLoginPasswordFieldError(reducerState.loginPasswordField))
    } else {
        dispatch(callPostLogin())
    }
    /* START - thunk performLoginFormSubmit after execute code. */
    /* END - thunk performLoginFormSubmit after execute code. */
}

/**
 * Thunk change registration email field
 *
 * @param {string} value email field value
 */
export const performInputRegistrationEmailField =
    (value: string): AuthorizationThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputRegistrationEmailField before execute code. */
        /* END - thunk performInputRegistrationEmailField before execute code. */

        dispatch(authorizationReducer.actions.performInputRegistrationEmailField(value))

        /* START - thunk performInputRegistrationEmailField after execute code. */
        const reducerState = getState().authorization

        if (reducerState.registrationEmailFieldError) {
            dispatch(performInputRegistrationEmailFieldError(value))
        }
        /* END - thunk performInputRegistrationEmailField after execute code. */
    }

/**
 * Thunk change registration email error field
 *
 * @param {string} value email field value
 */
export const performInputRegistrationEmailFieldError =
    (value: string): AuthorizationThunkType =>
    async (dispatch, getState) => {
        /* START - thunk performInputRegistrationEmailFieldError before execute code. */
        /* END - thunk performInputRegistrationEmailFieldError before execute code. */
        const reducerState = getState().authorization

        if (!constants.emailRegex.test(value)) {
            if (!reducerState.registrationEmailFieldError) {
                dispatch(
                    authorizationReducer.actions.performInputRegistrationEmailFieldError('Некорректный почтовый адрес'),
                )
            }
        } else if (reducerState.registrationEmailFieldError) {
            dispatch(authorizationReducer.actions.performInputRegistrationEmailFieldError(null))
        }
        /* START - thunk performInputRegistrationEmailFieldError after execute code. */
        /* END - thunk performInputRegistrationEmailFieldError after execute code. */
    }

/**
 * Thunk change registration password field
 *
 * @param {string} value password field value
 */
export const performInputRegistrationPasswordField =
    (value: string): AuthorizationThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputRegistrationPasswordField before execute code. */
        /* END - thunk performInputRegistrationPasswordField before execute code. */

        dispatch(authorizationReducer.actions.performInputRegistrationPasswordField(value))

        /* START - thunk performInputRegistrationPasswordField after execute code. */
        const reducerState = getState().authorization

        if (reducerState.registrationPasswordFieldError) {
            dispatch(performInputRegistrationPasswordFieldError(value))
        }
        /* END - thunk performInputRegistrationPasswordField after execute code. */
    }

/**
 * Thunk change registration password error field
 *
 * @param {string} value password field value
 */
export const performInputRegistrationPasswordFieldError =
    (value: string): AuthorizationThunkType =>
    async (dispatch, getState) => {
        /* START - thunk performInputRegistrationPasswordFieldError before execute code. */
        /* END - thunk performInputRegistrationPasswordFieldError before execute code. */
        const reducerState = getState().authorization

        if (!value) {
            dispatch(authorizationReducer.actions.performInputRegistrationPasswordFieldError('Введите пароль'))
        } else if (reducerState.registrationPasswordFieldError) {
            dispatch(authorizationReducer.actions.performInputRegistrationPasswordFieldError(null))
        }
        /* START - thunk performInputRegistrationPasswordFieldError after execute code. */
        /* END - thunk performInputRegistrationPasswordFieldError after execute code. */
    }

/**
 * Thunk change registration repeat password field
 *
 * @param {string} value password field value
 */
export const performInputRegistrationRepeatPasswordField =
    (value: string): AuthorizationThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputRegistrationRepeatPasswordField before execute code. */
        /* END - thunk performInputRegistrationRepeatPasswordField before execute code. */

        dispatch(authorizationReducer.actions.performInputRegistrationRepeatPasswordField(value))

        /* START - thunk performInputRegistrationRepeatPasswordField after execute code. */
        const reducerState = getState().authorization

        if (reducerState.registrationRepeatPasswordField) {
            dispatch(performInputRegistrationRepeatPasswordFieldError(value))
        }
        /* END - thunk performInputRegistrationRepeatPasswordField after execute code. */
    }

/**
 * Thunk change registration repeat password error field
 *
 * @param {string} value password field value
 */
export const performInputRegistrationRepeatPasswordFieldError =
    (value: string): AuthorizationThunkType =>
    async (dispatch, getState) => {
        /* START - thunk performInputRegistrationRepeatPasswordFieldError before execute code. */
        /* END - thunk performInputRegistrationRepeatPasswordFieldError before execute code. */

        const reducerState = getState().authorization

        if (value !== reducerState.registrationPasswordField) {
            dispatch(
                authorizationReducer.actions.performInputRegistrationRepeatPasswordFieldError('Пароли не совпадают'),
            )
        } else if (reducerState.registrationRepeatPasswordFieldError) {
            dispatch(authorizationReducer.actions.performInputRegistrationRepeatPasswordFieldError(null))
        }

        /* START - thunk performInputRegistrationRepeatPasswordFieldError after execute code. */
        /* END - thunk performInputRegistrationRepeatPasswordFieldError after execute code. */
    }

/**
 * Thunk check all registration fields and then call registration request
 */
export const performRegistrationFormSubmit = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk performRegistrationFormSubmit before execute code. */
    /* END - thunk performRegistrationFormSubmit before execute code. */
    const reducerState = getState().authorization

    if (
        reducerState.registrationEmailField.trim() === '' ||
        reducerState.registrationPasswordField.trim() === '' ||
        reducerState.registrationRepeatPasswordField.trim() === ''
    ) {
        dispatch(performInputRegistrationEmailFieldError(reducerState.registrationEmailField))
        dispatch(performInputRegistrationPasswordFieldError(reducerState.registrationPasswordField))
        dispatch(performInputRegistrationRepeatPasswordFieldError(reducerState.registrationRepeatPasswordField))
    } else {
        dispatch(callPostRegistration())
    }
    /* START - thunk performRegistrationFormSubmit after execute code. */
    /* END - thunk performRegistrationFormSubmit after execute code. */
}

/**
 * Thunk update userData
 */
export const performSetUserData =
    (userData: ModelsRedux.IUserData | null): AuthorizationThunkType =>
    async (dispatch) => {
        /* START - thunk performSetUserData before execute code. */
        /* END - thunk performSetUserData before execute code. */

        dispatch(authorizationReducer.actions.performSetUserData(userData))

        /* START - thunk performSetUserData after execute code. */
        /* END - thunk performSetUserData after execute code. */
    }

/**
 * Registration data request
 */
export const callPostRegistration = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk callPostRegistration before execute code. */
    if (!util.checkInternetConnected()) {
        toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
            position: 'top-center',
            theme: 'colored',
            type: 'error',
        })
        return
    }
    /* END - thunk callPostRegistration before execute code. */
    const reducerState = getState().authorization

    if (reducerState.registrationPhase !== 'InProgress') {
        dispatch(authorizationReducer.actions.performSetRegistrationPhase('InProgress'))
        dispatch(authorizationReducer.actions.performSetRegistrationError(null))

        const requestData: ModelsRedux.IRegistrationRequest = {
            email: reducerState.registrationEmailField,
            password: reducerState.registrationPasswordField,
            role: 'USER',
        }

        API.apiPost<ModelsRedux.IRegistrationRequest, ModelsRedux.IRegistrationResponse>(
            'api/user/registration',
            requestData,
            (response: AxiosResponse<ModelsRedux.IRegistrationResponse>) => {
                localStorage.setItem('token', response.data.accessToken)

                dispatch(performSetUserData(response.data.user))
                dispatch(authorizationReducer.actions.performSetRegistrationPhase('Success'))

                toast('На вашу почту было отправлено письмо с инструкцией по активации аккаунта', {
                    position: 'top-center',
                    theme: 'colored',
                    type: 'success',
                })
            },
            (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                if (!error) {
                    dispatch(
                        authorizationReducer.actions.performSetRegistrationError({
                            message: 'Произошла непредвиденная ошибка',
                            code: 500,
                        }),
                    )

                    toast('Произошла непредвиденная ошибка', {
                        position: 'top-center',
                        theme: 'colored',
                        type: 'error',
                    })
                } else {
                    dispatch(
                        authorizationReducer.actions.performSetRegistrationError({
                            message: error.data.message,
                            code: error.status,
                        }),
                    )

                    toast(error.data.message, {
                        position: 'top-center',
                        theme: 'colored',
                        type: 'error',
                    })
                }

                dispatch(authorizationReducer.actions.performSetRegistrationPhase('Failure'))
            },
        )
    }
    /* START - thunk callPostRegistration after execute code. */
    /* END - thunk callPostRegistration after execute code. */
}

/**
 * Login data request
 */
export const callPostLogin = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk callPostLogin before execute code. */
    if (!util.checkInternetConnected()) {
        toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
            position: 'top-center',
            theme: 'colored',
            type: 'error',
        })
        return
    }
    /* END - thunk callPostLogin before execute code. */
    const reducerState = getState().authorization

    if (reducerState.loginPhase !== 'InProgress') {
        dispatch(authorizationReducer.actions.performSetLoginPhase('InProgress'))
        dispatch(authorizationReducer.actions.performSetLoginError(null))

        const requestData: ModelsRedux.ILoginRequest = {
            email: reducerState.loginEmailField,
            password: reducerState.loginPasswordField,
        }

        API.apiPost<ModelsRedux.ILoginRequest, ModelsRedux.ILoginResponse>(
            'api/user/login',
            requestData,
            (response: AxiosResponse<ModelsRedux.ILoginResponse>) => {
                localStorage.setItem('token', response.data.accessToken)

                dispatch(performSetUserData(response.data.user))
                dispatch(authorizationReducer.actions.performSetLoginPhase('Success'))

                if (!response.data.user.isActivated) {
                    toast('На вашу почту было отправлено письмо с инструкцией по активации аккаунта', {
                        position: 'top-center',
                        theme: 'colored',
                        type: 'info',
                    })
                }
            },
            (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                if (!error) {
                    dispatch(
                        authorizationReducer.actions.performSetLoginError({
                            message: 'Произошла непредвиденная ошибка',
                            code: 500,
                        }),
                    )

                    toast('Произошла непредвиденная ошибка', {
                        position: 'top-center',
                        theme: 'colored',
                        type: 'error',
                    })
                } else {
                    dispatch(
                        authorizationReducer.actions.performSetLoginError({
                            message: error.data.message,
                            code: error.status,
                        }),
                    )

                    toast(error.data.message, {
                        position: 'top-center',
                        theme: 'colored',
                        type: 'error',
                    })
                }

                dispatch(authorizationReducer.actions.performSetLoginPhase('Failure'))
            },
        )
    }
    /* START - thunk callPostLogin after execute code. */
    /* END - thunk callPostLogin after execute code. */
}

/**
 * Thunk cheks is user auth
 */
export const callGetCheckAuth = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk callGetCheckAuth before execute code. */
    if (!util.checkInternetConnected()) {
        toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
            position: 'top-center',
            theme: 'colored',
            type: 'error',
        })
        return
    }
    /* END - thunk callGetCheckAuth before execute code. */
    const reducerState = getState().authorization

    if (reducerState.checkAuthPhase !== 'InProgress') {
        dispatch(authorizationReducer.actions.performSetCheckAuthPhase('InProgress'))
        dispatch(authorizationReducer.actions.performSetCheckAuthError(null))

        API_HOST.apiGet<null, ModelsRedux.ICheckAuthResponse>(
            'api/user/refresh',
            null,
            (response: AxiosResponse<ModelsRedux.ICheckAuthResponse>) => {
                localStorage.setItem('token', response.data.accessToken)

                dispatch(performSetUserData(response.data.user))
                dispatch(authorizationReducer.actions.performSetCheckAuthPhase('Success'))
            },
            (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                if (!error) {
                    dispatch(
                        authorizationReducer.actions.performSetCheckAuthError({
                            message: 'Произошла непредвиденная ошибка',
                            code: 500,
                        }),
                    )
                } else {
                    dispatch(
                        authorizationReducer.actions.performSetCheckAuthError({
                            message: error.data.message,
                            code: error.status,
                        }),
                    )
                }

                dispatch(authorizationReducer.actions.performSetCheckAuthPhase('Failure'))
            },
        )
    }
    /* START - thunk callGetCheckAuth after execute code. */
    /* END - thunk callGetCheckAuth after execute code. */
}

/**
 * Thunk logout user
 */
export const callPostLogout = (): AuthorizationThunkType => async (dispatch, getState) => {
    /* START - thunk callPostLogout before execute code. */
    if (!util.checkInternetConnected()) {
        toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
            position: 'top-center',
            theme: 'colored',
            type: 'error',
        })
        return
    }
    /* END - thunk callPostLogout before execute code. */
    const reducerState = getState().authorization

    if (reducerState.logoutPhase !== 'InProgress') {
        dispatch(authorizationReducer.actions.performSetLogoutPhase('InProgress'))
        dispatch(authorizationReducer.actions.performSetLogoutError(null))

        API_HOST.apiPost<null, null>(
            'api/user/logout',
            null,
            () => {
                localStorage.removeItem('token')

                dispatch(authorizationReducer.actions.performSetLogoutPhase('Success'))
                dispatch(authorizationReducer.actions.performSetUserData(null))
            },
            (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                if (!error) {
                    dispatch(
                        authorizationReducer.actions.performSetLogoutError({
                            message: 'Произошла непредвиденная ошибка',
                            code: 500,
                        }),
                    )
                } else {
                    dispatch(
                        authorizationReducer.actions.performSetLogoutError({
                            message: error.data.message,
                            code: error.status,
                        }),
                    )
                }

                dispatch(authorizationReducer.actions.performSetLogoutPhase('Failure'))
            },
        )
    }
    /* START - thunk callPostLogout after execute code. */
    /* END - thunk callPostLogout after execute code. */
}
