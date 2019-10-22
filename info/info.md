Auto Rename Tag
Beautify
Better Align
Color HighLight
Color Picker
Git History
GitLens
Highlight Matching Tag
htmltagwrap
Live Sass Compiler
Markdown All in One --
Markdown Preview --
open in browser --
Rainbow Brackets

{
	// Place your snippets for scss here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// },
	"outline red" : {
		"prefix": "ored",
		"body": "outline: 2px solid red;",
		"description": "outline: 2px solid red;"
	},
	"outline green" : {
		"prefix": "ogreen",
		"body": "outline: 2px solid green;",
		"description": "outline: 2px solid green;"
	},
	"outline blue" : {
		"prefix": "oblue",
		"body": "outline: 2px solid blue;",
		"description": "outline: 2px solid blue;"
	},
	"tablet" : {
		"prefix": "tablet",
		"body": [
			"@include tablet {",
			"  $1",
			"}"
			],
			"description": "tablet mixin"
	},
	"mobile" : {
		"prefix": "mobile",
		"body": [
			"@include mobile {",
			"  $1",
			"}"
			],
			"description": "mobile mixin"
	},
	"wide-mobile" : {
		"prefix": "wide-mobile",
		"body": [
			"@include wide-mobile {",
			"  $1",
			"}"
			],
			"description": "wide-mobile mixin"
	},
	"laptop" : {
		"prefix": "laptop",
		"body": [
			"@include laptop {",
			"  $1",
			"}"
			],
			"description": "laptop mixin"
	},	
	"desktop" : {
		"prefix": "desktop",
		"body": [
			"@include desktop {",
			"  $1",
			"}"
			],
			"description": "desktop mixin"
	}
}