/** 객체 깊은 복사. 재귀로 depth상관없이 전부 다 깊은복사함 */
const deepClone = obj => {
	let clone = Object.assign({}, obj);
	Object.keys(clone).forEach(
		key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
	);
	return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

/** 객체를 immutable하도록 고정시킴(Freeze).. const 강화버전으로 사용 */
const deepFreeze = obj =>
	Object.keys(obj).forEach(
		prop =>
			!(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop])
	) || Object.freeze(obj);


/**
 * 객체를 파고들어가서 해당 키값에 맞는 밸류를 반환함
 *
 * ex)
 * const data =
 * {
 *  a: {
 *    b: {
 *      c: 'cValue'
 *        }
 *     }
 * }
 *
 * dig(data, 'c'); // 'cValue'
 * dig(data, 'd'); // undefined
 *
 * 다른레벨에 동명의 key가 존재하는경우 높은레벨것을 먼저 반환함
 *
 */
const dig = (obj = {default: 'invalid parameter'}, target = 'default') =>
	target in obj
		? obj[target]
		: Object.values(obj).reduce((acc, val) => {
			if (acc !== undefined) return acc;
			if (typeof val === 'object') return dig(val, target);
		}, undefined);

const objectUtil = {

	deepClone,
	deepFreeze,
	dig

}


export default objectUtil