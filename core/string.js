

const stringUtil = {

	/** 문자열에서 HTML태그 제거 */
	removeHTMLTags(str) {
		str.replace(/<[^>]*>/g, '');
	}

}


export default stringUtil