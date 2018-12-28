
const browserUtil = {

	/** 화면 밑바닥이 보이는지 여부 반환 */
	isBottomVisible() {
		return document.documentElement.clientHeight + window.scrollY >=
		(document.documentElement.scrollHeight || document.documentElement.clientHeight);
	},

	/** 모바일기기인지 판별한다 */
	isMobile() {
		const filter = "win16|win32|win64|mac|macintel"
		const realMobileDevice = navigator.platform && (filter.indexOf(navigator.platform.toLowerCase()) < 0)
		const mobileWeb = /(Android)/.test(navigator.userAgent)
		return realMobileDevice || mobileWeb
	},

	/**
	 * 엘리먼트가 현재 뷰포트에 보이는지 여부
	 *   -> 기본적으로 엘리먼트가 완전하게 다 보여야 true반환함.
	 *   -> partiallyVisible을 true로 주면 부분만 보일때도 true반환
	 */
	elementIsVisibleInViewport(el, partiallyVisible = false) {
		if(el.jquery) { el = el[0]; }	// jquery객체인경우 DOM 엘리먼트로 파싱
		const { top, left, bottom, right } = el.getBoundingClientRect();
		const { innerHeight, innerWidth } = window;
		return partiallyVisible
			? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
			((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
			: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
	},

	/** 해당 엘리먼트까지 부드럽게 이동시킴 */
	smoothScroll (selector) {
		document.querySelector(selector).scrollIntoView({
			behavior: 'smooth'
		});
	},

	/** UUID 생성 */
	UUIDGeneratorBrowser() {
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
		);
	}

}


export default browserUtil