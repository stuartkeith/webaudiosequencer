({
	baseUrl: "./source/javascript",
	dir: "./_build/javascript",
	mainConfigFile: "./source/javascript/main.js",
	modules: [
		{
			name: "main"
		},
		{
			name: "application",
			exclude: [
				"jquery",
				"text"
			]
		}
	],
	preserveLicenseComments: false,
	removeCombined: true
})
