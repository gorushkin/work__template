# info
---

* ## git grog

  `git config --global alias.grog 'log --graph --abbrev-commit --decorate --all --format=format:"%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(dim white) - %an%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n %C(white)%s%C(reset)"'`
* ## git co
  `git config --global alias.co checkout`
* ## git co
  `git config --global alias.add add .`
* ## git br
  `git config --global alias.br branch`
* ## git ci
  `git config --global alias.ci commit`
* ## git st
   `git config --global alias.st status`
* ## git lg
   `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

alias ls='ls -cvA --block-size=K --group-directories-first -1 --color=always'

alias gl='git log --pretty=format:"%h %C(magenta)%ad | %C(white)%s%d %C(magenta)[%an]" --date=short --graph --max-count=40 $*'
alias gs='git status'
alias ga='git add .'
alias gco='git commit -m $*'
alias push='git push'
alias pull='git pull'

alias pro='cd /mnt/d/projects' # ЗАМЕНИТЕ на путь к вашей директории проектов!

alias i='npm i $*'
alias s='npm start $*'
alias r='npm run $*'

alias subl='subl.exe $*'

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