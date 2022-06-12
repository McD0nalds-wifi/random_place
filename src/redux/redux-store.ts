import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import mainReducer from './reducers/main-reducer'

const rootReducer = combineReducers({
    [mainReducer.name]: mainReducer.reducer,
})

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
}
    ? U
    : never

export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, RootStateType, unknown, A>

// redux-thunk идет из коробки
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store