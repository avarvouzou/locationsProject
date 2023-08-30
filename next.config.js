/** @type {import('next').NextConfig} */
module.exports = {
	output: 'standalone', // output to dockerize app for CI/CD
	reactStrictMode: true,
	env: {},
	images: {
		domains: [],
		remotePatterns: [],
	},
}
