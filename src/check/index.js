import pwdIntensity from './pwdIntensity';

/**
 * 校验库
 *
 * cellphone - 手机校验
 * telphone - 固定电话校验
 * phone - 电话【手机和固定电话】校验
 * email - 邮箱校验
 * postcode - 邮编校验
 * isNull - 空校验
 * isNumber - 数字校验
 * isInteger - 整数校验
 * isDecimal - 小数校验
 * money - 金额【元】判断
 * hasChinese - 中文判断
 * idCard - 身份证校验
 * ip - ip地址校验
 * alipay - 支付宝账号校验
 * pwdIntensity - 弱密码校验
 */
class Check {
  /**
   * 手机校验
   * 规则：11位数字，首位1
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * cellphone('13456789012');
   * // => true
   */
  cellphone = (value) => /^1\d{10}$/.test(value);

  /**
   * 固定电话校验
   * 规则：3-4位区号，7-8位直拨号码
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * telphone('0571-85735888');
   * // => true
   *
   * telphone('057185735888');
   * // => true
   *
   * telphone('85735888');
   * // => true
   */
  telphone = (value) => /^(\d{3,4}-?)?\d{7,8}$/.test(value);

  /**
   * 电话【手机和固定电话】校验
   *
   * @param {*} vlaue - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * phone('057185735888');
   * // => true
   *
   * phone('13456789012');
   * // => true
   */
  phone = (value) => this.cellphone(value) || this.telphone(value);

  /**
   * 邮箱校验
   * 规则：登录名@主机名.域名
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   *
   * email('test@163.com');
   * // => true
   *
   * email('te_st@sima.vip.com');
   * // => true
   */
  email = (value) => /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+)+$/.test(value);

  /**
   * 邮编校验
   * 规则：6位数字
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   *
   * postcode('310000');
   * // => true
   */
  postcode = (value) => /^\d{6}$/.test(value);

  /**
   * 空校验
   * 空数据集合：undefined,'undefined',null,'null','(null)','NaN',''
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * isNull();
   * // => true
   *
   * isNull('undefined');
   * // => true
   */
  isNull = (value) => {
    if (
      typeof value === 'undefined'
      || value === 'undefined'
      || value === null
      || value === 'null'
      || value === '(null)'
      || value === 'NaN'
      || value === ''
    ) {
      return true;
    }
    return false;
  };

  /**
   * 数字校验
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * isNumber('20');
   * // => true
   *
   * isNumber('-20');
   * // => true
   *
   * isNumber('.2');
   * // => false
   */
  isNumber = (value) => /^-?\d+(\.\d+)?$/.test(value);

  /**
   * 整数校验
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * isInteger('20');
   * // => true
   *
   * isInteger('-20');
   * // => true
   *
   * isInteger('0.2');
   * // => false
   *
   * isInteger('020');
   * // => false
   */
  isInteger = (value) => /^-?(\d|[1-9]\d+)$/.test(value);

  /**
   * 小数校验
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * isDecimal('0.2');
   * // => true
   *
   * isDecimal('-0.2');
   * // => true
   *
   * isDecimal('20');
   * // => false
   *
   * isDecimal('00.2');
   * // => false
   */
  isDecimal = (value) => /^-?(\d|[1-9]\d+)\.\d+$/.test(value);

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
  money = (value) => /^-?(\d|[1-9]\d+)(\.\d{1,2})?$/.test(value);

  /**
   * 中文判断
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * hasChinese('中文');
   * // => true
   *
   * hasChinese('。');
   * // => true
   */
  hasChinese = (value) => {
    const pattern = [
      '\u2000-\u206F', // 常用标点
      '\u2E80-\u2EFF', // CJK 部首补充
      '\u2F00-\u2FDF', // 康熙字典部首
      '\u2FF0-\u2FFF', // 表意文字描述符
      '\u3000-\u303F', // CJK 符号和标点
      '\u31C0-\u31EF', // CJK 笔画
      '\u3300-\u33FF', // CJK 兼容
      '\u3400-\u4DBF', // CJK 统一表意符号扩展 A
      '\u4E00-\u9FBF', // CJK 统一表意符号
      '\uF900-\uFAFF', // CJK 兼容象形文字
      '\uFE30-\uFE4F', // CJK 兼容形式
      '\uFF00-\uFFEF', // 半型及全型形式【针对部分中文标点符号】
    ];
    const regexp = new RegExp(`[${pattern.join('')}]`);
    return regexp.test(value);
  };

  /**
   * 身份证校验
   * 一代身份证【15位】：地址码【六位】出生日期码【六位】数字顺序码【三位】
   * 二代身份证【18位】：地址码【六位】出生日期码【八位】数字顺序码【三位】数字校验码【一位】
   *
   * 地址码 [1-9]\d{5}
   * 出生年份 [1-9]\d{3}
   * 出生月份 0[1-9]|1[0-2]
   * 出生日期 0[1-9]|[1-2]\d|3[0-1]
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * idCard('330000199001017865');
   * // => true
   *
   * idCard('33000019900101786X');
   * // => true
   *
   * idCard('330000900101786');
   * // => true
   */
  idCard = (value) => {
    const pattern = '^[1-9]\\d{7}(0[1-9]|1[0-2])(0[1-9]|[1-2]\\d|3[0-1])\\d{3}$'; // 一代身份证
    const pattern2 = '^[1-9]\\d{5}[1-9]\\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\\d|3[0-1])\\d{3}(\\d|X)$'; // 二代身份证
    const regexp = new RegExp(`${pattern}|${pattern2}`, 'i');
    return regexp.test(value);
  };

  /**
   * ip地址校验
   *
   * 分析IP地址的组成特点：0-199、200-249、250-255。
   * 这三种情况可以分开考虑:
   * 1. 250-255：特点：三位数，百位是2，十位是5，个位是0~5，用正则表达式可以写成：25[0-5]
   * 2. 200-249：特点：三位数，百位是2，十位是0~4，个位是0~9，用正则表达式可以写成：2[0-4]\d
   * 3. 0-199：这个可以继续分拆，这样写起来更加简单明了
   * 3.1. 0-9：特点：一位数，个位是0~9，用正则表达式可以写成：\d
   * 3.2. 10-99：特点：二位数，十位是1~9，个位是0~9，用正则表达式可以写成：[1-9]\d
   * 3.3. 100-199：特点：三位数，百位是1，十位是0~9，个位是0~9，用正则表达式可以写成：1\d{2}
   * 于是0-99的正则表达式可以合写为：[1-9]?\d
   * 那么0-199用正则表达式就可以写成：1\d{2}|[1-9]?\d
   * 这样0-255的正则表达式就可以写成：25[0-5]|2[0-4]\d|(1\d{2}|[1-9]?\d)
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * ip('192.168.0.1');
   * // => true
   */
  ip = (value) => {
    const pattern = '(25[0-5]|2[0-4]\\d|(1\\d{2}|[1-9]?\\d))';
    const regexp = new RegExp(`^(${pattern}\\.){3}${pattern}$`);
    return regexp.test(value);
  };

  /**
   * 支付宝账号校验
   * 规则：邮箱或手机号
   *
   * @param {*} value - The value to check.
   * @return {Boolean} Return `true` if validated, else `false`.
   * @example
   *
   * alipay('test@163.com');
   * // => true
   *
   * alipay('13456789012');
   * // => true
   */
  alipay = (value) => this.email(value) || this.cellphone(value);

  /**
   * 弱密码校验
   *
   * @param {String} value - 密码
   * @return {Number} intensity - 密码强度 1-弱|2-中|3-强
   * @example
   *
   * pwdIntensity('123456');
   * // => 1
   *
   * pwdIntensity('123456abc');
   * // => 2
   *
   * pwdIntensity('123456abcABC');
   * // => 3
   */
  pwdIntensity = pwdIntensity;

  // todo
  // 日期是否正确判断
}

export default new Check();