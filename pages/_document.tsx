import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}
	render() {
		return (
			<Html>
				<Head>
					<meta charSet='utf-8' />

					<meta property='og:title' content='NEXT TEAMPLATE' />
					<meta name='twitter:title' content='NEXT TEAMPLATE' />

					<meta name='description' content='NEXT TEAMPLATE' />
					<meta property='og:description' content='NEXT TEAMPLATE' />
					<meta name='twitter:description' content='NEXT TEAMPLATE' />

					<meta property='og:site_name' content='NEXT TEAMPLATE' key='og:site_name' />
					<meta property='og:locale' content='ru' />

					<meta name='twitter:url' content='https://' />
					<meta name='twitter:site' content='@' />
					<meta property='twitter:card' content='summary' />

					<meta name='theme-color' content='#1F1F1F' />
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/favicons/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicons/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicons/favicon-16x16.png'
					/>
					<link rel='manifest' href='/favicons/site.webmanifest' />
					<link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#c2b154' />
					<meta name='msapplication-TileColor' content='#f3df74' />

					{process.env.NODE_ENV === 'production' && <></>}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
