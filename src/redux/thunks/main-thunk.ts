import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { ModelsRedux } from 'types'

import mainReducer, { MainThunkType } from '../reducers/main-reducer'

import * as util from '../../common/util'
import { API } from '../../api/api'

/* START - Main additional imports and module code. */

/**
 * Thunk add new category
 *
 * @param {string} category new category
 */
export const performInputAddCategoryItem =
    (category: string): MainThunkType =>
    (dispatch) => {
        /* START - thunk performInputAddCategoryItem before execute code. */
        /* END - thunk performInputAddCategoryItem before execute code. */

        dispatch(mainReducer.actions.performInputAddCategoryItem(category))

        /* START - thunk performInputAddCategoryItem after execute code. */
        /* END - thunk performInputAddCategoryItem after execute code. */
    }

/**
 * Thunk delete category
 *
 * @param {string} category category
 */
export const performInputDeleteCategoryItem =
    (category: string): MainThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputDeleteCategoryItem before execute code. */
        /* END - thunk performInputDeleteCategoryItem before execute code. */

        const reducerState = getState().main

        const categoryIndex: number = reducerState.currentCategoryList.findIndex((item) => item === category)

        if (categoryIndex >= 0) {
            dispatch(mainReducer.actions.performInputDeleteCategoryItem(categoryIndex))
        }

        /* START - thunk performInputDeleteCategoryItem after execute code. */
        /* END - thunk performInputDeleteCategoryItem after execute code. */
    }

/**
 * Thunk checked or unchecked all districts
 */
export const performInputAllDistrictsChecked = (): MainThunkType => (dispatch, getState) => {
    /* START - thunk performInputAllDistrictsChecked before execute code. */
    /* END - thunk performInputAllDistrictsChecked before execute code. */

    const reducerState = getState().main

    const updateDistrictList = [...reducerState.districtList].map((districtItem) => ({
        ...districtItem,
        isChecked: !reducerState.isAllDistrictsChecked,
    }))

    dispatch(mainReducer.actions.performInputAllDistrictsChecked(updateDistrictList))

    /* START - thunk performInputAllDistrictsChecked after execute code. */
    /* END - thunk performInputAllDistrictsChecked after execute code. */
}

/**
 * Thunk checked or unchecked district
 *
 * @param {number} districtItemId item id
 */
export const performInputDistrictChecked =
    (districtItemId: number): MainThunkType =>
    (dispatch, getState) => {
        /* START - thunk performInputDistrictChecked before execute code. */
        /* END - thunk performInputDistrictChecked before execute code. */

        const reducerState = getState().main

        const updateDistrictList = [...reducerState.districtList].map((districtItem) =>
            districtItem.id === districtItemId
                ? {
                      ...districtItem,
                      isChecked: !districtItem.isChecked,
                  }
                : districtItem,
        )

        dispatch(mainReducer.actions.performInputDistrictChecked(updateDistrictList))

        /* START - thunk performInputDistrictChecked after execute code. */
        /* END - thunk performInputDistrictChecked after execute code. */
    }

/**
 * Place data request
 */
export const callPostAddPlace =
    (request: ModelsRedux.IAddPlaceRequest, image: File): MainThunkType =>
    async (dispatch, getState) => {
        /* START - thunk callPostAddPlace before execute code. */
        if (!util.checkInternetConnected()) {
            toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
                position: 'top-center',
                theme: 'colored',
                type: 'error',
            })
            return
        }
        /* END - thunk callPostAddPlace before execute code. */
        const reducerState = getState().main

        if (reducerState.addPlacePhase !== 'InProgress') {
            dispatch(mainReducer.actions.performSetAddPlacePhase('InProgress'))
            dispatch(mainReducer.actions.performSetAddPlaceError(null))

            const requestData: ModelsRedux.IAddPlaceRequest = request

            API.apiPost<ModelsRedux.IAddPlaceRequest, ModelsRedux.IAddPlaceResponse>(
                'api/place/add',
                requestData,
                (response: AxiosResponse<ModelsRedux.IAddPlaceResponse>) => {
                    dispatch(mainReducer.actions.performSetAddPlaceData(response.data))
                    dispatch(mainReducer.actions.performSetAddPlacePhase('Success'))

                    dispatch(callPostAddPlaceImage(image))
                },
                (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                    if (error) {
                        dispatch(
                            mainReducer.actions.performSetAddPlaceError({
                                message: error.data.message,
                                code: error.status,
                            }),
                        )
                    } else {
                        dispatch(
                            mainReducer.actions.performSetAddPlaceError({
                                message: 'Произошла непредвиденная ошибка',
                                code: 500,
                            }),
                        )
                    }

                    dispatch(mainReducer.actions.performSetAddPlacePhase('Failure'))
                },
            )
        }

        /* START - thunk callPostAddPlace after execute code. */
        /* END - thunk callPostAddPlace after execute code. */
    }

/**
 * Place data request
 */
export const callPostAddPlaceImage =
    (image: File): MainThunkType =>
    async (dispatch, getState) => {
        /* START - thunk callPostAddPlaceImage before execute code. */
        if (!util.checkInternetConnected()) {
            toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
                position: 'top-center',
                theme: 'colored',
                type: 'error',
            })
            return
        }
        /* END - thunk callPostAddPlaceImage before execute code. */
        const reducerState = getState().main

        if (reducerState.addPlaceImagePhase !== 'InProgress') {
            dispatch(mainReducer.actions.performSetAddPlaceImagePhase('InProgress'))
            dispatch(mainReducer.actions.performSetAddPlaceImageError(null))

            const requestData = new FormData()

            requestData.append('id', reducerState.addPlaceData ? String(reducerState.addPlaceData.id) : '0')
            requestData.append('image', image)

            API.apiPost<FormData, ModelsRedux.IAddPlaceResponse>(
                'api/place/addImage',
                requestData,
                (response: AxiosResponse<ModelsRedux.IAddPlaceResponse>) => {
                    dispatch(mainReducer.actions.performSetAddPlaceImageData(response.data))
                    dispatch(mainReducer.actions.performSetAddPlaceImagePhase('Success'))
                },
                (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                    if (error) {
                        dispatch(
                            mainReducer.actions.performSetAddPlaceImageError({
                                message: error.data.message,
                                code: error.status,
                            }),
                        )
                    } else {
                        dispatch(
                            mainReducer.actions.performSetAddPlaceImageError({
                                message: 'Произошла непредвиденная ошибка',
                                code: 500,
                            }),
                        )
                    }

                    dispatch(mainReducer.actions.performSetAddPlaceImagePhase('Failure'))
                },
            )
        }

        /* START - thunk callPostAddPlaceImage after execute code. */
        /* END - thunk callPostAddPlaceImage after execute code. */
    }

/**
 * Place data request
 */
export const callPostRandomPlace = (): MainThunkType => async (dispatch, getState) => {
    /* START - thunk callPostRandomPlace before execute code. */
    if (!util.checkInternetConnected()) {
        toast('При загрузке данных произошла ошибка. Проверьте ваше подключение к сети', {
            position: 'top-center',
            theme: 'colored',
            type: 'error',
        })
        return
    }
    /* END - thunk callPostRandomPlace before execute code. */
    const reducerState = getState().main

    if (reducerState.randomPlacePhase !== 'InProgress') {
        dispatch(mainReducer.actions.performSetRandomPlacePhase('InProgress'))
        dispatch(mainReducer.actions.performSetRandomPlaceError(null))

        const selectedDistrict = reducerState.districtList.filter(
            (districtItem) => districtItem.isChecked && districtItem,
        )

        const requestData: ModelsRedux.IRandomPlaceRequest = {
            category: util.getConvertCategoryList(reducerState.currentCategoryList),
            district: selectedDistrict.map((districtItem): string => districtItem.title),
            isAllDistrictsSelected: reducerState.isAllDistrictsChecked || reducerState.districtList.length === 0,
            averageCheckMinValue: reducerState.rangeMinValue,
            averageCheckMaxValue: reducerState.rangeMaxValue,
        }

        API.apiPost<ModelsRedux.IRandomPlaceRequest, ModelsRedux.IRandomPlaceResponse | null>(
            'api/place/getRandom',
            requestData,
            (response: AxiosResponse<ModelsRedux.IRandomPlaceResponse | null>) => {
                dispatch(mainReducer.actions.performSetRandomPlaceData(response.data))
                dispatch(mainReducer.actions.performSetRandomPlacePhase('Success'))
            },
            (error: AxiosResponse<ModelsRedux.IServerError> | undefined) => {
                if (error) {
                    dispatch(
                        mainReducer.actions.performSetRandomPlaceError({
                            message: error.data.message,
                            code: error.status,
                        }),
                    )
                } else {
                    dispatch(
                        mainReducer.actions.performSetRandomPlaceError({
                            message: 'Произошла непредвиденная ошибка',
                            code: 500,
                        }),
                    )
                }

                dispatch(mainReducer.actions.performSetRandomPlacePhase('Failure'))
            },
        )
    }

    /* START - thunk callPostRandomPlace after execute code. */
    /* END - thunk callPostRandomPlace after execute code. */
}

/**
 * Thunk change price min value
 *
 * @param {number} value min value
 */
export const performInputRangeMinValueChange =
    (value: number): MainThunkType =>
    (dispatch) => {
        /* START - thunk performInputRangeMinValueChange before execute code. */
        /* END - thunk performInputRangeMinValueChange before execute code. */

        dispatch(mainReducer.actions.performInputRangeMinValueChange(value))

        /* START - thunk performInputRangeMinValueChange after execute code. */
        /* END - thunk performInputRangeMinValueChange after execute code. */
    }

/**
 * Thunk change price max value
 *
 * @param {number} value max value
 */
export const performInputRangeMaxValueChange =
    (value: number): MainThunkType =>
    (dispatch) => {
        /* START - thunk performInputRangeMaxValueChange before execute code. */
        /* END - thunk performInputRangeMaxValueChange before execute code. */

        dispatch(mainReducer.actions.performInputRangeMaxValueChange(value))

        /* START - thunk performInputRangeMaxValueChange after execute code. */
        /* END - thunk performInputRangeMaxValueChange after execute code. */
    }
