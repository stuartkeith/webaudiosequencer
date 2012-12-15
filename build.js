({
	baseUrl: "./source/javascript",
	dir: "./optimized/javascript",
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
