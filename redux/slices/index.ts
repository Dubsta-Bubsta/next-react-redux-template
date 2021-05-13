import { combineReducers, AnyAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import me from './me/meSlice'
import app from './app/appSlice'
import { UserAgent } from 'next-useragent'

export interface IState {
	me: { logged: boolean; userInfo: any }
	app: { userAgent: UserAgent }
}

const combineReducer = combineReducers({
	me,
	app,
})

const rootReducer = (state: IState | undefined, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload

		default: {
			return combineReducer(state, action)
		}
	}
}

export type RootReducerType = typeof combineReducer
export default rootReducer
