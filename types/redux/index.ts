import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { RootReducerType, store } from 'redux/store'

export type RootState = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
