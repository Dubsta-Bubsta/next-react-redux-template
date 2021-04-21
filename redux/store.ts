import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import appSlice from './app/appSlice'
import meSlice from './me/meSlice'

const combinedReducer = combineReducers({
	app: appSlice,
	me: meSlice,
})

const reducer = (state, action: AnyAction) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		}

		return nextState
	} else {
		return combinedReducer(state, action)
	}
}

const initStore = () => {
	return configureStore({
		reducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
		// .concat(logger)
		devTools: process.env.NODE_ENV !== 'production',
	})
}

export type RootReducerType = typeof combinedReducer
export const wrapper = createWrapper(initStore)

export const store = initStore()
