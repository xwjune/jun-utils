import bytesToSize from '../bytesToSize';
import fenToYuan from '../fenToYuan';
import yuanToFen from '../yuanToFen';
import numberToCn from '../numberToCn';
import currencyToCn from '../currencyToCn';
import combination from '../combination';
import toThousands from '../toThousands';

describe('数据容量单位换算', () => {
  const testMap = [{
    input: '',
    output: '0B',
  }, {
    input: '32g',
    output: '0B',
  }, {
    input: -10,
    output: '0B',
  }, {
    input: 0,
    output: '0B',
  }, {
    input: 0.3,
    output: '0.3B',
  }, {
    input: 10000,
    output: '9.8KB',
  }, {
    input: 10240,
    output: '10.0KB',
  }, {
    input: 1024 * 32,
    output: '32.0KB',
  }, {
    input: 1024 * 1024,
    output: '1.0MB',
  }, {
    input: 1024 ** 3,
    output: '1.0GB',
  }, {
    input: 1024 ** 4,
    output: '1.0TB',
  }, {
    input: 1024 ** 5,
    output: '1.0PB',
  }, {
    input: 1024 ** 6,
    output: '1.0EB',
  }, {
    input: 1024 ** 7,
    output: '1.0ZB',
  }, {
    input: 1024 ** 8,
    output: '1.0YB',
  }, {
    input: 1024 ** 9,
    output: '1.0BB',
  }, {
    input: 1024 ** 10,
    output: '1.0NB',
  }, {
    input: 1024 ** 11,
    output: '1.0DB',
  }, {
    input: 1024 ** 12,
    output: '1.0CB',
  }, {
    input: 1024 ** 13,
    output: '1024.0CB',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(bytesToSize(el.input)).toBe(el.output);
    });
  });
  test('保留两位有效数：10240 => 10.00KB', () => {
    expect(bytesToSize(10240, 2)).toBe('10.00KB');
  });
});

describe('分转化成元', () => {
  const testMap = [{
    input: undefined,
    output: '0.00',
  }, {
    input: null,
    output: '0.00',
  }, {
    input: '',
    output: '0.00',
  }, {
    input: 0.2,
    output: '0.00',
  }, {
    input: 0,
    output: '0.00',
  }, {
    input: '0',
    output: '0.00',
  }, {
    input: -0,
    output: '0.00',
  }, {
    input: '-0',
    output: '-0.00',
  }, {
    input: .2, // eslint-disable-line no-floating-decimal
    output: '0.00',
  }, {
    input: '0.2',
    output: '0.00',
  }, {
    input: '-0.2',
    output: '-0.00',
  }, {
    input: '2.0',
    output: '0.02',
  }, {
    input: '2',
    output: '0.02',
  }, {
    input: '20',
    output: '0.20',
  }, {
    input: '200',
    output: '2.00',
  }, {
    input: '2000',
    output: '20.00',
  }, {
    input: '2000.45',
    output: '20.00',
  }, {
    input: '-2000',
    output: '-20.00',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(fenToYuan(el.input)).toBe(el.output);
    });
  });
  test('去掉小数末尾多余的零', () => {
    expect(fenToYuan(2000, { cutZero: true })).toBe('20');
  });
  test('数字千位符分隔', () => {
    expect(fenToYuan(200000, { toThousands: true })).toBe('2,000.00');
    expect(fenToYuan(200000, { toThousands: true, cutZero: true })).toBe('2,000');
    expect(fenToYuan(200022, { toThousands: true })).toBe('2,000.22');
  });
  test('error', () => {
    expect(fenToYuan('.2')).toBe('');
    expect(fenToYuan('-.2')).toBe('');
    expect(fenToYuan('9.007199254740992e+21')).toBe('');
    expect(fenToYuan('null')).toBe('');
    expect(fenToYuan('num')).toBe('');
  });
  test('空数据', () => {
    expect(fenToYuan()).toBe('0.00');
    expect(fenToYuan(undefined)).toBe('0.00');
    expect(fenToYuan(null)).toBe('0.00');
    expect(fenToYuan('')).toBe('0.00');
    expect(fenToYuan(undefined, { format: '--' })).toBe('--');
  });
});

describe('元转化为分', () => {
  const testMap = [{
    input: undefined,
    output: '0',
  }, {
    input: null,
    output: '0',
  }, {
    input: '',
    output: '0',
  }, {
    input: '0.000',
    output: '0',
  }, {
    input: '0.001',
    output: '0',
  }, {
    input: '0.010',
    output: '1',
  }, {
    input: '0.101',
    output: '10',
  }, {
    input: '0.00',
    output: '0',
  }, {
    input: '0.01',
    output: '1',
  }, {
    input: '0.10',
    output: '10',
  }, {
    input: '0.0',
    output: '0',
  }, {
    input: '0.1',
    output: '10',
  }, {
    input: 0,
    output: '0',
  }, {
    input: -0,
    output: '0',
  }, {
    input: '-0',
    output: '-0',
  }, {
    input: 0.1,
    output: '10',
  }, {
    input: .1, // eslint-disable-line no-floating-decimal
    output: '10',
  }, {
    input: '10',
    output: '1000',
  }, {
    input: '10.0201',
    output: '1002',
  }, {
    input: '-10.0201',
    output: '-1002',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(yuanToFen(el.input)).toBe(el.output);
    });
  });
  test('error', () => {
    expect(yuanToFen('.2')).toBe('');
    expect(yuanToFen('-.2')).toBe('');
    expect(yuanToFen('null')).toBe('');
    expect(yuanToFen('9.007199254740992e+21')).toBe('');
  });
  test('空值格式化', () => {
    expect(yuanToFen(null, '--')).toBe('--');
    expect(yuanToFen('', '--')).toBe('--');
    expect(yuanToFen(undefined, '--')).toBe('--');
  });
});

describe('阿拉伯数字转中文', () => {
  const testMap = [{
    input: '0',
    output: '零',
  }, {
    input: '0.00',
    output: '零点零零',
  }, {
    input: '0.01',
    output: '零点零壹',
  }, {
    input: '0.10',
    output: '零点壹零',
  }, {
    input: '1',
    output: '壹',
  }, {
    input: '10',
    output: '壹拾',
  }, {
    input: '100',
    output: '壹佰',
  }, {
    input: '1000',
    output: '壹仟',
  }, {
    input: '1008',
    output: '壹仟零捌',
  }, {
    input: '1080',
    output: '壹仟零捌拾',
  }, {
    input: '10000',
    output: '壹万',
  }, {
    input: '10008',
    output: '壹万零捌',
  }, {
    input: '108000',
    output: '壹拾万捌仟',
  }, {
    input: '10000000',
    output: '壹仟万',
  }, {
    input: '10000800',
    output: '壹仟万零捌佰',
  }, {
    input: '10008000',
    output: '壹仟万捌仟',
  }, {
    input: '100000000',
    output: '壹亿',
  }, {
    input: '100000008',
    output: '壹亿零捌',
  }, {
    input: '100000800',
    output: '壹亿零捌佰',
  }, {
    input: '100080000',
    output: '壹亿零捌万',
  }, {
    input: '100080800',
    output: '壹亿零捌万零捌佰',
  }, {
    input: '100008000',
    output: '壹亿零捌仟',
  }, {
    input: '10000000000',
    output: '壹佰亿',
  }, {
    input: '999999999999.99',
    output: '玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖点玖玖',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(numberToCn(el.input)).toBe(el.output);
    });
  });
  test('数据错误', () => {
    expect(numberToCn()).toBe('数据错误');
    expect(numberToCn(null)).toBe('数据错误');
    expect(numberToCn('')).toBe('数据错误');
    expect(numberToCn(undefined)).toBe('数据错误');
    expect(numberToCn('-12')).toBe('数据错误');
    expect(numberToCn('12x')).toBe('数据错误');
    expect(numberToCn('.2')).toBe('数据错误');
    expect(numberToCn('-.2')).toBe('数据错误');
    expect(numberToCn('9.007199254740992e+21')).toBe('数据错误');
  });
  test('边界值', () => {
    expect(numberToCn(1000000000000)).toBe('超大数字');
  });
});

describe('数字金额转换为中文人民币大写', () => {
  const testMap = [{
    input: undefined,
    output: '零元整',
  }, {
    input: null,
    output: '零元整',
  }, {
    input: '',
    output: '零元整',
  }, {
    input: '0',
    output: '零元整',
  }, {
    input: '0.0',
    output: '零元整',
  }, {
    input: '0.00',
    output: '零元整',
  }, {
    input: '0.01',
    output: '零壹分',
  }, {
    input: '0.10',
    output: '壹角',
  }, {
    input: 0.1,
    output: '壹角',
  }, {
    input: .1, // eslint-disable-line no-floating-decimal
    output: '壹角',
  }, {
    input: '1.01',
    output: '壹元零壹分',
  }, {
    input: '1.10',
    output: '壹元壹角',
  }, {
    input: '1.00',
    output: '壹元整',
  }, {
    input: '1.0',
    output: '壹元整',
  }, {
    input: '1',
    output: '壹元整',
  }, {
    input: '1000',
    output: '壹仟元整',
  }, {
    input: '10000',
    output: '壹万元整',
  }, {
    input: '10000.08',
    output: '壹万元零捌分',
  }, {
    input: '10008',
    output: '壹万零捌元整',
  }, {
    input: '108000',
    output: '壹拾万捌仟元整',
  }, {
    input: '10000800',
    output: '壹仟万零捌佰元整',
  }, {
    input: '10008000',
    output: '壹仟万捌仟元整',
  }, {
    input: '100000000',
    output: '壹亿元整',
  }, {
    input: '100000800',
    output: '壹亿零捌佰元整',
  }, {
    input: '999999999999.99',
    output: '玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(currencyToCn(el.input)).toBe(el.output);
    });
  });
  test('错误输入', () => {
    expect(currencyToCn('1x')).toBe('数据错误');
    expect(currencyToCn('-12')).toBe('数据错误');
    expect(currencyToCn('.2')).toBe('数据错误');
    expect(currencyToCn('9.007199254740992e+21')).toBe('数据错误');
  });
  test('空值输入', () => {
    expect(currencyToCn()).toBe('零元整');
    expect(currencyToCn(undefined)).toBe('零元整');
    expect(currencyToCn(null)).toBe('零元整');
    expect(currencyToCn('')).toBe('零元整');
  });
  test('空值格式化', () => {
    expect(currencyToCn(undefined, '--')).toBe('--');
  });
  test('边界值', () => {
    expect(currencyToCn(1000000000000)).toBe('超大金额');
  });
});

describe('列出n个数组所有组合', () => {
  const source = [
    ['黑色', '白色'],
    ['64G', '128G'],
    ['国行', '港行'],
    ['全网通'],
  ];
  const result = [
    ['黑色', '64G', '国行', '全网通'],
    ['黑色', '64G', '港行', '全网通'],
    ['黑色', '128G', '国行', '全网通'],
    ['黑色', '128G', '港行', '全网通'],
    ['白色', '64G', '国行', '全网通'],
    ['白色', '64G', '港行', '全网通'],
    ['白色', '128G', '国行', '全网通'],
    ['白色', '128G', '港行', '全网通'],
  ];
  test('combination', () => {
    expect(combination(source)).toEqual(result);
  });
});

describe('数字千位符分隔', () => {
  const testMap = [{
    input: 12,
    output: '12',
  }, {
    input: 0.2,
    output: '0.2',
  }, {
    input: .2, // eslint-disable-line no-floating-decimal
    output: '0.2',
  }, {
    input: '12',
    output: '12',
  }, {
    input: '123',
    output: '123',
  }, {
    input: '1234',
    output: '1,234',
  }, {
    input: '12345',
    output: '12,345',
  }, {
    input: '123456',
    output: '123,456',
  }, {
    input: '1234567',
    output: '1,234,567',
  }, {
    input: '1234.56',
    output: '1,234.56',
  }, {
    input: '1234.5678',
    output: '1,234.5678',
  }, {
    input: '-1234.5678',
    output: '-1,234.5678',
  }, {
    input: '9.007199254740992e+21',
    output: '9.007199254740992e+21',
  }];
  testMap.forEach((el) => {
    test(`${el.input} => ${el.output}`, () => {
      expect(toThousands(el.input)).toBe(el.output);
    });
  });
  test('error', () => {
    expect(toThousands()).toBe('');
    expect(toThousands(undefined)).toBe('');
    expect(toThousands(null)).toBe('');
    expect(toThousands('')).toBe('');
    expect(toThousands('.2')).toBe('');
    expect(toThousands('-.2')).toBe('');
    expect(toThousands('x12')).toBe('');
    expect(toThousands('1.2.')).toBe('');
  });
});
