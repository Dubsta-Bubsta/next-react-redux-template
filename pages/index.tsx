import React from 'react'
import Head from 'next/head'
import { wrapper } from '../redux/store'
import { useAppDispatch, useAppSelector } from 'types/redux'
import { useRouter } from 'next/router'
import { logout, login } from 'redux/me/meSlice'

interface IProps {
	a: any
}

const MainPage = ({ ...props }: IProps) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const me = useAppSelector(state => state.me.userInfo)

	const handleLogin = async () => {
		await dispatch(login({ login: 'tester@mail.ru', password: 'password' }))
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<>
			<Head>
				<title>NEXT TEMPLATE</title>
				<meta name='og:title' content='NEXT TEMPLATE' />

				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://' />
				<meta name='twitter:url' content='https://' />
				<link rel='canonical' href='https://' />
				<meta property='og:image' content='https://' />
				<meta property='og:image:url' content='https://' />
				<meta property='og:image:secure_url' content='https://' />
				<meta property='twitter:image' content='https://' />
				<meta property='vk:image' content='https://' />
				<link rel='image_src' href='https://' />
			</Head>
			<div></div>
		</>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req }) => {
	return {
		props: {},
	}
})

export default MainPage
