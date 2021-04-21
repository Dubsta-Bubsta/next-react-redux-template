import { instance } from '../../index'
import { AxiosResponse } from 'axios'
import { LoginResponseType } from './types'
import { MeType } from 'types/me'

export const securityAPI = {
	login: (email: string, password: string): Promise<AxiosResponse<LoginResponseType>> => {
		return instance.post('/security/signIn', { email, password })
	},
	refreshToken: (refreshToken: string): Promise<AxiosResponse<LoginResponseType>> => {
		return instance.post('/')
	},
	getProfile: (): Promise<AxiosResponse<MeType>> => {
		return instance.get('/profile')
	},
}
