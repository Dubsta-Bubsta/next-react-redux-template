import cookie from 'js-cookie'

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
	cookie.set('accessToken', accessToken, { expires: 2 })
	cookie.set('refreshToken', refreshToken, { expires: 7 })
}
