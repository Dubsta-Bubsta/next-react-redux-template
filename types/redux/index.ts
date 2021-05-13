import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { RootReducerType } from 'redux/slices'
import { store } from 'redux/store'

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<ReturnType<RootReducerType>> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
