const postcssLoadConfig = require(`postcss-load-config`)
const postcss = require(`postcss`)

module.exports = (context = {}) => {
	const { useConfigFile = true, configFilePath, plugins = [] } = context

	if (useConfigFile === false) {
		return ({ content, filename }) => Promise.resolve(process(plugins, content, filename))
	} else {
		const configPromise = postcssLoadConfig(context, configFilePath)

		return ({ content, filename }) => configPromise.then(
			({ plugins }) => process(plugins, content, filename)
		)
	}
}

function process(plugins, css, filename) {
	return postcss(plugins)
		.process(css, {
			from: filename,
			map: {
				inline: false,
			},
		})
		.then(result => ({
			code: result.css,
			map: result.map.toJSON(),
		}))
}
