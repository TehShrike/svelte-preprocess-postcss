Preprocess your Svelte component styles with PostCSS!

Uses [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) under the hood for config loading.

# API

```js
import sveltePreprocessPostcss from 'svelte-preprocess-postcss'

const stylePreprocessor = sveltePreprocessPostcss({
	configFilePath: '',
	useConfigFile: true,
	plugins: [
		require('precss')
	]
})
```

## `preprocessorFunction = sveltePreprocessPostcss([context])`

If no context is passed in, configuration options are loaded from postcss.config.js or .postcssrc.js starting in the current directory.

If you do pass in a context object/function, it is passed to `postcss-load-config`.

Besides whatever `postcss-load-config` does with the context, you can also provide these values:

- `configFilePath` (optional string): If supplied, is used as the root path to use to look for a config file.  Defaults to the current working directory.
- `useConfigFile` (optional boolean): if `false`, the preprocessor won't go looking for any configuration file - the `plugins` property of the `context` object will be used by itself.  Defaults to `true`.

You can both pass in a context object with plugins and whatnot, and also load from a config file - `postcss-load-config` handles merging those together.

# Examples

## [`svelte.preprocess`](https://github.com/sveltejs/svelte/#preprocessor-options)

```js
const processed = await svelte.preprocess(source, {
	style: stylePreprocessor
})
```

## [`rollup-plugin-svelte`](https://github.com/rollup/rollup-plugin-svelte)

```js
export default {
	plugins: [
		svelte({
			preprocess: {
				style: stylePreprocessor
			},
			css(css) {
				css.write(`public/components.css`)
			}
		}),
	],
}
```

# License

[WTFPL](http://wtfpl2.com)
