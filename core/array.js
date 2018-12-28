
const arrayUtil = {

	/** 반복문을 거꾸로 돌린다. 콜백인자: 1-요소, 2-인덱스, 3-본래배열 */
	reverseForEach(arr, callback) {
		arr.slice(0).reverse().forEach(callback);
	},

	/**
	 * 2개 배열의 교집합 배열 반환
	 *   (3번째 인자로 함수식을 받아서 해당 처리 후의 교집합을 얻을 수 있음. 구성요소는 1번째 배열에서 가져옴)
	 */
	intersection(a, b, fn = item=>item) {
		if(typeof fn !== "function") { fn = item => item }
		const s = new Set(b.map(fn));
		return a.filter(x => s.has(fn(x)));
	},

	/** 정렬여부 반환. 오름차순:1, 내림차순:-1, 정렬안됨:0 */
	getOrderType(arr) {
		let direction = -(arr[0] - arr[1]);
		for (let [i, val] of arr.entries()) {
			direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
			if (i === arr.length - 1) return !direction ? 0 : direction;
			else if ((val - arr[i + 1]) * direction > 0) return 0;
		}
	}

}


export default arrayUtil