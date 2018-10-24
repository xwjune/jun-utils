> npm工具包

## 使用
```bash
## Install globally or locally
$ npm i jun-utils -S
```
```js
import { check } from 'jun-utils';

// 手机号码校验
check.cellphone('13456789012'); // true
```

## check
校验库

### cellphone(value)
手机

```js
check.cellphone('13456789012'); // true
```

## stringUtil
字符串处理

### isNull(str)
空校验

空数据集合：undefined,'undefined',null,'null','(null)','NaN',''

```js
stringUtil.isNull(); // true

stringUtil.isNull('undefined'); // true

stringUtil.isNull('xxx'); // false
```

### isNumber(str)
数字校验

```js
stringUtil.isNumber('20'); // true

stringUtil.isNumber('.2'); // false

stringUtil.isNumber('xx'); // false
```

### filterNull(str, [format=''])
空数据过滤

```js
stringUtil.filterNull('xxx'); // xxx

stringUtil.filterNull(); //

stringUtil.filterNull(null, '--'); // --
```

### convertFenToYuan(str, [format='0.00'])
分转化成元

```js
stringUtil.convertFenToYuan('2000'); // 20.00

stringUtil.convertFenToYuan(); // 0.00

stringUtil.convertFenToYuan(null, '--'); // --
```

### convertYuanToFen(str, [format='0'])
元转化为分

```js
stringUtil.convertYuanToFen('20'); // 2000

stringUtil.convertYuanToFen('0.02'); // 2

stringUtil.convertYuanToFen('0.002'); // 0

stringUtil.convertYuanToFen(); // 0

stringUtil.convertYuanToFen(null, '--'); // --
```

## common
通用方法

### generateUUID()
生成uuid

```js
common.generateUUID(); // cd2f4b1f-daf2-451c-a9a6-db716c1d82bb
```

### getParameter(name, [url=window.location.search])
获取url中的参数

```js
common.getParameter('name', 'http://www.w3school.com?name=xxx'); // xxx
```
