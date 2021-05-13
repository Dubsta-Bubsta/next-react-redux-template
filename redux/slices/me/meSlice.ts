import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { MeType } from 'types/me'
import { LoginPayloadType } from './types'
import { securityAPI, setAxiosToken } from 'api'
import cookie from 'js-cookie'
import { LoginResponseType } from 'api/requestsRepository/security/types'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { setAuthCookies } from 'utils/api/setAuthCookies'

const initialState = {
	logged: false,
	userInfo: {} as MeType,
}

export const login = createAsyncThunk<LoginResponseType, LoginPayloadType>(
	'me/login',
	async (payload, { dispatch, rejectWithValue }) => {
		const { login, password } = payload

		try {
			const response = await securityAPI.login(login, password)
			if (response?.status === 200) {
				const { accessToken, refreshToken } = response.data
				setAuthCookies(accessToken, refreshToken)
				Router.reload()
			}

			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	},
)

export const logout = createAsyncThunk('me/auth', async () => {
	cookie.remove('accessToken')
	cookie.remove('refreshToken')
	Router.reload()
})

export const getUserInfo = createAsyncThunk(
	'me/getUserInfo',
	async (payload, { dispatch, rejectWithValue }) => {
		try {
			const response = await securityAPI.getProfile()

			if (response?.status === 200) {
				dispatch(setUserInfo(response.data))
				dispatch(setLogged(true))
			}

			return response.data as MeType
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	},
)

export const authUser = createAsyncThunk<any, any>(
	'me/auth',
	async (payload, { dispatch, rejectWithValue }) => {
		const { accessToken, refreshToken } = nextCookie(payload as any)

		if (accessToken) {
			setAxiosToken(accessToken)
			await dispatch(getUserInfo())
		} else if (refreshToken) {
			const response = await securityAPI.refreshToken(refreshToken)
			if (response.status === 200) {
				setAuthCookies(accessToken, refreshToken)
			}
		}
	},
)

export const meSlice = createSlice({
	name: 'me',
	initialState,
	reducers: {
		setLogged: (state, action: PayloadAction<boolean>) => {
			state.logged = action.payload
		},
		setUserInfo: (state, action: PayloadAction<MeType>) => {
			state.userInfo = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.userInfo = action.payload
		})
	},
})

export const { setUserInfo, setLogged } = meSlice.actions

export default meSlice.reducer
