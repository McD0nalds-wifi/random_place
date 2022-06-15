import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelsRedux, EnumsRedux } from 'types'

import { authorizationState } from './../states/authorization-state'

import { InferActionsTypes, BaseThunkType } from '../redux-store'

/* START - Authorization additional imports and module code. */

const authorizationReducer = createSlice({
    name: 'authorization',
    initialState: authorizationState,
    reducers: {
        performInputLoginEmailField(state, action: PayloadAction<string>) {
            state.loginEmailField = action.payload
        },
        performInputLoginEmailFieldError(state, action: PayloadAction<string | null>) {
            state.loginEmailFieldError = action.payload
        },
        performInputLoginPasswordField(state, action: PayloadAction<string>) {
            state.loginPasswordField = action.payload
        },
        performInputLoginPasswordFieldError(state, action: PayloadAction<string | null>) {
            state.loginPasswordFieldError = action.payload
        },
        performInputRegistrationEmailField(state, action: PayloadAction<string>) {
            state.registrationEmailField = action.payload
        },
        performInputRegistrationEmailFieldError(state, action: PayloadAction<string | null>) {
            state.registrationEmailFieldError = action.payload
        },
        performInputRegistrationPasswordField(state, action: PayloadAction<string>) {
            state.registrationPasswordField = action.payload
        },
        performInputRegistrationPasswordFieldError(state, action: PayloadAction<string | null>) {
            state.registrationPasswordFieldError = action.payload
        },
        performInputRegistrationRepeatPasswordField(state, action: PayloadAction<string>) {
            state.registrationRepeatPasswordField = action.payload
        },
        performInputRegistrationRepeatPasswordFieldError(state, action: PayloadAction<string | null>) {
            state.registrationRepeatPasswordFieldError = action.payload
        },
        performSetRegistrationPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.registrationPhase = data.payload
        },
        performSetUserData(state, data: PayloadAction<ModelsRedux.IUserData | null>) {
            state.userData = data.payload
        },
        performSetRegistrationError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.registrationError = data.payload
        },
        performSetLoginPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.loginPhase = data.payload
        },
        performSetLoginError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.loginError = data.payload
        },
        performSetCheckAuthPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.checkAuthPhase = data.payload
        },
        performSetCheckAuthError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.checkAuthError = data.payload
        },
        performSetLogoutPhase(state, data: PayloadAction<EnumsRedux.ThunkChainPhase>) {
            state.logoutPhase = data.payload
        },
        performSetLogoutError(state, data: PayloadAction<ModelsRedux.IError | null>) {
            state.logoutError = data.payload
        },
    },
})

export default authorizationReducer

export type AuthorizationStateType = typeof authorizationState
type ActionsTypes = InferActionsTypes<typeof authorizationReducer.actions>
export type AuthorizationThunkType = BaseThunkType<ActionsTypes>
