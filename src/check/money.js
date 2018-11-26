/**
 * 金额【元】判断
 * 规则：数字，最多两位小数
 *
 * @param {*} value - The value to check.
 * @return {Boolean} Return `true` if validated, else `false`.
 * @example
 *
 * money('-20');
 * // => true
 *
 * money('20.00');
 * // => true
 *
 * money('20.002');
 * // => false
 *
 * money('002');
 * // => false
 */
export default function money(value) {
  return /^-?(\d|[1-9]\d+)(\.\d{1,2})?$/.test(value);
}
