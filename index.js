const postcssLoadConfig = require(`postcss-load-config`)
const postcss = require(`postcss`)

module.exports = config => {
	const configPromise = postcssLoadConfig({}, config)

	return ({ content }) => configPromise.then(
		({ plugins }) =>
			postcss(plugins)
				.process(content)
				.then(code => ({ code }))
	)
}
