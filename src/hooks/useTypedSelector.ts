import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootStateType } from '../redux/redux-store'

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector
