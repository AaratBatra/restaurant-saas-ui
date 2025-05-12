/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "portal.restaurantonesolution.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "media-exp3.licdn.com",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "th.bing.com",
				port: "",
				pathname: "/**"
			}
		]
	},
};

export default nextConfig;
