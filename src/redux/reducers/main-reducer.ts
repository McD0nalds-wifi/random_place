import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelsRedux, EnumsRedux } from 'types'

import { mainState } from './../states/main-state'

import { InferActionsTypes, BaseThunkType } from '../redux-store'

/* START - Main additional imports and module code. */

const mainReducer = createSlice({
    name: 'main',
    initialState: mainState,
    reducers: {
        performInputAddCategoryItem(state, action: PayloadAction<EnumsRedux.CategoryCyrillicType>) {
            state.currentCategoryList.push(action.payload)
        },
        performInputDeleteCategoryItem(state, action: PayloadAction<number>) {
            state.currentCategoryList.splice(action.payload, 1)
        },
        performInputAllDistrictsChecked(state, action: PayloadAction<ModelsRedux.IDistrictItem[]>) {
            state.districtList = action.payload
            state.isAllDistrictsChecked = !state.isAllDistrictsChecked
        },
        performInputDistrictChecked(state, action: PayloadAction<ModelsRedux.IDistrictItem[]>) {
            state.districtList = action.payload
        },
        performInputRangeMinValueChange(state, action: PayloadAction<number>) {
            state.rangeMinValue = action.payload
        },
        performInputRangeMaxValueChange(state, action: PayloadAction<number>) {
            state.rangeMaxValue = action.payload
        },
        performSetAddPlaceData(state, action: PayloadAction<ModelsRedux.IAddPlaceResponse | null>) {
            state.addPlaceData = action.payload
        },
        performSetAddPlacePhase(state, action: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.addPlacePhase = action.payload
        },
        performSetAddPlaceError(state, action: PayloadAction<ModelsRedux.IError | null>) {
            state.addPlaceError = action.payload
        },
        performSetAddPlaceImageData(state, action: PayloadAction<ModelsRedux.IAddPlaceResponse | null>) {
            state.addPlaceImageData = action.payload
        },
        performSetAddPlaceImagePhase(state, action: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.addPlaceImagePhase = action.payload
        },
        performSetAddPlaceImageError(state, action: PayloadAction<ModelsRedux.IError | null>) {
            state.addPlaceImageError = action.payload
        },
        performSetRandomPlaceData(state, action: PayloadAction<ModelsRedux.IRandomPlaceData | null>) {
            state.randomPlaceData = action.payload
        },
        performSetRandomPlacePhase(state, action: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.randomPlacePhase = action.payload
        },
        performSetRandomPlaceError(state, action: PayloadAction<ModelsRedux.IError | null>) {
            state.randomPlaceError = action.payload
        },
    },
})

export default mainReducer

export type MainStateType = typeof mainState
type ActionsTypes = InferActionsTypes<typeof mainReducer.actions>
export type MainThunkType = BaseThunkType<ActionsTypes>
