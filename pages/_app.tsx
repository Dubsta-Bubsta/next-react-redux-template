import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'nprogress/nprogress.css'

import React from 'react'
import { wrapper } from '../redux/store'
import { Router, withRouter } from 'next/router'
import NProgress from 'nprogress'
import type { AppContext, AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { DefaultTheme } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { useUserAgent } from 'next-useragent'
import { setUserAgent } from 'redux/app/appSlice'
import { authUser } from 'redux/me/meSlice'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
const theme = {
	colors: {
		primary: '#0070f3',
	},
} as DefaultTheme

type IProps = AppProps

const MyApp = ({ Component, pageProps }: IProps) => {
	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const useragent = useUserAgent(ctx.req.headers['user-agent'])

	Promise.all([
		await ctx.store.dispatch(setUserAgent(useragent)),
		await ctx.store.dispatch(authUser(ctx) as any),
	])

	return {
		pageProps: {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			pathname: ctx.pathname,
		},
	}
}

export default wrapper.withRedux(withRouter(MyApp))
