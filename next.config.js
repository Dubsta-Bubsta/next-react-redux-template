/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withImages = require('next-images')

module.exports = withImages({
	webpack(config) {
		if (config.optimization.splitChunks) {
			config.optimization.splitChunks.cacheGroups.shared = {
				name: 'style',
				test: /\.css$/,
				chunks: 'all',
				enforce: true,
			}
		}
		return config
	},
	images: {
		domains: ['api.vsrap.ru'],
	},
	env: {
		API_URL: 'https://',
	},
})
