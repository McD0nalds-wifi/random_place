import { useDispatch } from 'react-redux'

type Dispatch = <TReturnType>(action: any) => TReturnType
export const useTypedDispatch = () => useDispatch<Dispatch>()
