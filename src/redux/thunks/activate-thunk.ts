import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { ModelsRedux } from 'types'

import activateReducer, { ActivateThunkType } from '../reducers/activate-reducer'

import * as util from '../../common/util'
import { API_HOST } from '../../api/api'

/* START - Activate additional imports and module code. */
import * as authorizationThunk from './authorization-thunk'

/**
 * Thunk activate user account
 */
export const callGetActivateAccount =
    (link: string): ActivateThunkType =>
    async (dispatch, getState) => {
        /* START - thunk callGetActivateAccount before execute code. */
        if (!util.checkInternetConnected()) {
            toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
                position: 'top-center',
                theme: 'colored',
                type: 'error',
            })
            return
        }
        /* END - thunk callGetActivateAccount before execute code. */
        const reducerState = getState().activate

        if (reducerState.activateAccountPhase !== 'InProgress') {
            dispatch(activateReducer.actions.performSetActivateAccountPhase('InProgress'))
            dispatch(activateReducer.actions.performSetActivateAccountError(null))

            API_HOST.apiGet<null, ModelsRedux.IActivateAccountResponse>(
                `api/user/activate/${link}`,
                null,
                (response: AxiosResponse<ModelsRedux.IActivateAccountResponse>) => {
                    dispatch(authorizationThunk.performSetUserData(response.data))
                    dispatch(activateReducer.actions.performSetActivateAccountPhase('Success'))
                },
                (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                    if (!error) {
                        dispatch(
                            activateReducer.actions.performSetActivateAccountError({
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
                            activateReducer.actions.performSetActivateAccountError({
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

                    dispatch(activateReducer.actions.performSetActivateAccountPhase('Failure'))
                },
            )
        }
        /* START - thunk callGetActivateAccount after execute code. */
        /* END - thunk callGetActivateAccount after execute code. */
    }
