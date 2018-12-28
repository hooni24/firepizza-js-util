
/** Number에 컴마 추가해서 String 반환 */
function addCommaToString(num) {
	if (!isNaN(num)) {
		let retValue = String(num);
		while (retValue.match(/^(-?\d+)(\d{3})/))
			retValue = retValue.replace(/^(-?\d+)(\d{3})/, '$1,$2');

		return retValue;
	} else {
		return "";
	}
}

/** String에 컴마 제거해서 String반환 */
function removeCommaToString(num) {
	if (num !== undefined) {
		if (num === "") num = "0";
		return num.replace(/,/g, "");
	} else {
		return "0";
	}
}

/** String에 컴마 제거해서 Number반환 */
function removeCommaToNumber(num) {
	num = Number(removeCommaToString(num));
	if (!num || isNaN(num)) num = 0;
	return num;
}

/** 만단위 숫자를 받아서 순수 한글로 출력 (컴마있는 숫자도 가능)
 *    ex) 12,345 => 일억 이천삼백사십오만
 */
function numberToPureKorean(val) {
	let hanA = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"];
	let danA = ["", "십", "백", "천"];
	let retValue = "";
	let chk = false;

	if (val !== "" && val != null) {
		val = removeCommaToNumber(String(val));

		let intVal = parseInt(val, 10);
		val = '' + intVal;
		for (let i = 0; i < val.length; i++) {
			let str = "";
			let han = hanA[val.charAt(val.length - (i + 1))];
			if (han !== "") str = han + danA[i % 4];
			if (i < 4) {
				if (han !== "") chk = true;
			}
			if (i === 4) str += "억 ";
			if (i === 8) str += "조 ";
			if (i === 12) str += "경 ";
			retValue = str + retValue;
		}
		if (chk) {
			retValue = retValue + "만";
		}
	}
	return retValue;
}

/** 만단위 숫자를 받아서 숫자와 한글 조합으로 출력 (컴마있는 숫자도 가능)
 *    ex) 12,345 => 1억2345만
 */
function numberToMixedKorean(val) {
	let won = removeCommaToString(String(val)) + '0000'; // DB에서 만 단위로 넘어오므로 0000를 붙임.
	let arrWon = ["원", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
	let retValue = "";
	let pattern = /(-?[0-9]+)([0-9]{4})/;
	while (pattern.test(won)) {
		won = won.replace(pattern, "$1,$2");
	}

	let rtnMoney = won.split(",");
	let len = rtnMoney.length;
	let arrCnt = len - 1;
	let unitVal = 0;
	for (let i = 0; i < len; i++) {
		if (arrWon[arrCnt] === undefined) {
			break;
		}
		unitVal = parseInt(rtnMoney[i]);
		if (unitVal !== 0) {
			retValue += unitVal + arrWon[arrCnt];
		}
		arrCnt--;
	}
	return retValue;
}


const numberUtil = {
	/** 유틸 내에서 상호호출 하는 함수들 */
	addCommaToString,
	removeCommaToString,
	removeCommaToNumber,
	numberToPureKorean,
	numberToMixedKorean,

	/** 독자적인 함수들 */

	/** 범위안의 랜덤정수 반환 */
	randomIntegerInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}


export default numberUtil