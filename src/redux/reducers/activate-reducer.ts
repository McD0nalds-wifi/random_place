import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelsRedux, EnumsRedux } from 'types'

import { activateState } from './../states/activate-state'

import { InferActionsTypes, BaseThunkType } from '../redux-store'

/* START - Activate additional imports and module code. */

const activateReducer = createSlice({
    name: 'activate',
    initialState: activateState,
    reducers: {
        performSetActivateAccountPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.activateAccountPhase = data.payload
        },
        performSetActivateAccountError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.activateAccountError = data.payload
        },
    },
})

export default activateReducer

export type ActivateStateType = typeof activateState
type ActionsTypes = InferActionsTypes<typeof activateReducer.actions>
export type ActivateThunkType = BaseThunkType<ActionsTypes>
