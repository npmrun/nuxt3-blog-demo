import removeMarkdown from "remove-markdown"


const DEFAULTS = {
	concatLines: true
}

const getDescription = (markdown: any, options: any) => {
	if (typeof markdown === 'string' && markdown.length > 0) {
		let characterSelector = options.concatLines ? '[\\s\\S]' : '.' // dot doesn’t match newlines; [\s\S] matches anything
		let regex = new RegExp(`^[^#\\s]${characterSelector}{1,160}(?=(?:\\s|$))`, 'gm')
		let matches: any = markdown.match(regex)
		if (matches && matches.length) {
			return removeMarkdown(matches.shift()).replace(/\n{1,}/g, ' ').trim()
		}
	}
	return
}

function getMarkdownDescription(markdown: any, options?: any) {
	options = Object.assign({}, DEFAULTS, options ?? {})
	return getDescription(markdown, options)
}

export {
	getMarkdownDescription
}