const postcssLoadConfig = require(`postcss-load-config`)
const postcss = require(`postcss`)

module.exports = (context = {}) => {
	const { useConfigFile = true, configFilePath, plugins = [] } = context

	if (useConfigFile === false) {
		return ({ content, fileName }) => Promise.resolve(process(plugins, content, fileName))
	} else {
		const configPromise = postcssLoadConfig(context, configFilePath)

		return ({ content, fileName }) => configPromise.then(
			({ plugins }) => process(plugins, content, fileName)
		)
	}
}

function process(plugins, css, filename) {
	return postcss(plugins)
		.process(css, {
			from: filename,
			map: {
				inline: false
			}
		})
		.then(result => ({
				code: result.css,
				map: result.map
		}));
}
