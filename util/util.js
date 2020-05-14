// 扩充方法
Number.prototype.div = function (arg) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = this.toString().split('.')[1].length;
  } catch (e) { }
  try {
    t2 = arg.toString().split('.')[1].length;
  } catch (e) { }
  r1 = Number(this.toString().replace('.', ''));
  r2 = Number(arg.toString().replace('.', ''));
  return r1 / r2 * Math.pow(10, t2 - t1);
};
Number.prototype.mul = function (arg) {
  var m = 0,
    s1 = this.toString(),
    s2 = arg.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) { }
  try {
    m += s2.split('.')[1].length;
  } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};
export default class Util{
  constructor(){}

  /**
   * 检测数据类性
   * @param obj  任意需要判断类性的数据
   * @return {String/Number/Boolean/Object/Array/Function/Date/Null/Undefined/Math/RegExp} 数据类型
   * */
  static CheckType(obj){
    let _t =  Object.prototype.toString.call(obj);
	  return /^\[object (.*)\]$/.exec(_t)[1]
  }

  /**
   * 判断是否为空对象
   * @param obj 任意对象
   * @return {true/false} 是否为空
   * */
  static CheckAir (obj){
    if(typeof obj !='object') return;
    for(let i in obj) {
      return false;
    }
    return true;
  }

  /**
   * 解析url参数; window.location.search 是 url中"?"符后的字串
   * @param url 需要解析的 url 不传默认为当前 url
   * @return {}  包含所有 key 和 value 的一个二维数组;
   *
   * */
   static GetUrlInfo(url=window.location.search){
     let obj = new Object();
     // 判断 url 后面是否有参数
    if(url.indexOf('?') != -1 ){
      let strs = url.substr(1).split("&"); //从第一个字符开始截取
      for (let i = 0; i < strs.length; i++) {
        //decodeURI：将字符解码
        //decodeURIComponent：解码可解析特殊字符 ":" "/" "%"
        obj[strs[i].split("=")[0]] = decodeURIComponent(
          strs[i].split("=")[1]
        );
      }
    }
    return obj;
   }
  /**
   * 功能：金额按千位逗号分割
   * @param s:Number|| String 需要转化的金额;
   * @param t:Number 保留小数位的个数 默认为保留两位小数 传零如果是整数则只展示整数位不保留小数位;
   * @return 金额按千位逗号分割的字符串. 如: 10,000,000.00
   *
   * */
  static SplitFactory(s, t) {
    if (/[^0-9.]/.test(s)) return '0';
    if (s == null || s == '') return '0';
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, '$1,$2');
    s = s.replace(/,(\d\d)$/, '.$1');
    if (t == 0) {
      // 不带小数位(默认是有小数位)
      var a = s.split('.');
      if (a[1] == '00') {
        s = a[0];
      }
    }
    return s;
  }
/**
   * 生成guid
   * @returns {string}
   */
  static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 深度复制 不能扩展对象
   * @param obj
   * @returns {any}
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 深拷贝
   * @param p:Object 目标对象
   * @param c:Object 可选 传值则扩充；不传值则返回新对象
   * @return {Object} copy 之后的新对象
   * */
  static deepCopy(p, c = {}) {
      for (var i in p) {
        if (!p.hasOwnProperty(i)) {
          continue;
        }
        if (typeof p[i] === 'object') {
          c[i] = p[i].constructor === Array ? [] : {};
          this.deepCopy(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
  }

  /**
   *  向上取整 12.3 -> 13
   * @param num:Number
   * @return {Number} 整数
   * */
  static ceil(num) {
    let n = Math.ceil(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 向下取整  12.3 -> 12
   * @param num:Number
   * @return {Number} 整数
   * */
  static floor(num) {
    let n = Math.floor(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 把数四舍五入为最接近的整数。  12.1->12 / 12.8->13
   * @param num:Number
   * @return {Number} 整数
   * */
  static round(num) {
    let n = Math.round(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 结果的小数点后有指定位数的数字。
   * @param num:Number
   * @param n:Number 保留位数
   * @return {Number}
   * */
  static toFixed(num, n) {
    let m = +((+num).toFixed(n));
    return isNaN(m) ? 0 : m;
  }

  /**
   * 隐藏16位银行卡信息
   * @param val:String 如：1234567891234567
   * @return {String} 123456******4567
   * */
  static hideBankCardNo(val){
    return val.substr(0,6)+val.substr(6,val.length-10).replace(/\d/g,'*')+val.substr(-4,4);
  }
    static toYuan(num, n) {
      n = n > 0 && n <= 10 ? n : 2;
      let result = parseFloat(num)
        .div(100)
        .toFixed(n);
      if (isNaN(result)) {
        return 0;
      }
      return result;
    }
    /**
     * 元转分
     * @param num
     * @returns {any}
     */
    static toCent(num) {
      let result = parseFloat(num).mul(100);
      if (isNaN(result)) {
        return 0;
      }
      return result;
    }

  /**
   * 大写转金额
   *
   * */

  /**
   * 金额转大写
   *
   * */

}

