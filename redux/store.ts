import { configureStore, getDefaultMiddleware, EnhancedStore } from '@reduxjs/toolkit'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import slices, { IState } from './slices'

const IS_DEV = process.env.NODE_ENV === 'development'

export const store = configureStore({
	reducer: slices,
	middleware: [...getDefaultMiddleware()],
	devTools: IS_DEV,
})

const setupStore = (context): EnhancedStore => store

const makeStore: MakeStore<IState> = context => setupStore(context)

export const wrapper = createWrapper(makeStore, {
	debug: IS_DEV,
})

export default wrapper
