import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserAgent } from 'next-useragent'

const initialState = {
	userAgent: null as UserAgent,
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setUserAgent: (state, action: PayloadAction<UserAgent>) => {
			state.userAgent = action.payload
		},
	},
})

export const { setUserAgent } = appSlice.actions

export default appSlice.reducer
