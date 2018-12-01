import { isNumber } from '../check/number';

/**
 * 分->元
 * 为防止浮点数及大数运算精度丢失，故采用字符串形式解析
 *
 * @param {Number} money - 分
 * @param {String} [format='0.00'] - 格式化
 * @returns {String} 元
 * @example
 *
 * fenToYuan(2000);
 * // => 20.00
 *
 * fenToYuan(2000.45); // 非正确格式，舍去小数部分
 * // => 20.00
 *
 * fenToYuan();
 * // => 0.00
 *
 * fenToYuan(null, '--');
 * // => --
 */
export default function fenToYuan(money, format = '0.00') {
  if (!isNumber(money)) {
    return format;
  }
  let str = money.toString();
  let result = '';
  if (str[0] === '-') {
    result = '-';
    str = str.substr(1);
  }
  if (str.indexOf('.') > -1) {
    // Trim decimal at the ending.
    str = str.replace(/\.\d+$/, '');
  }
  const len = str.length;
  switch (len) {
    case 1:
      result += `0.0${str}`;
      break;
    case 2:
      result += `0.${str}`;
      break;
    default:
      result += `${str.substr(0, len - 2)}.${str.substr(len - 2)}`;
  }

  return result;
}
