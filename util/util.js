
export default class Util {
  constructor() { }

  /**
   * 检测数据类性
   * @param obj  任意需要判断类性的数据
   * @return {String/Number/Boolean/Object/Array/Function/Date/Null/Undefined/Math/RegExp} 数据类型
   * */
  static CheckType (obj) {
    let _t = Object.prototype.toString.call(obj);
    return /^\[object (.*)\]$/.exec(_t)[1];
  }

  /**
   * 判断是否为空对象
   * @param obj 任意对象
   * @return {true/false} 是否为空
   * */
  static CheckAir (obj) {
    if (typeof obj != "object") return;
    for (let i in obj) {
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
  static GetUrlInfo (url = window.location.search) {
    let obj = new Object();
    // 判断 url 后面是否有参数
    if (url.indexOf("?") != -1) {
      let strs = url.substr(1).split("&"); //从第一个字符开始截取
      for (let i = 0; i < strs.length; i++) {
        //decodeURI：将字符解码
        //decodeURIComponent：解码可解析特殊字符 ":" "/" "%"
        obj[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
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
  static SplitFactory (s, t) {
    if (/[^0-9.]/.test(s)) return "0";
    if (s == null || s == "") return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (t == 0) {
      // 不带小数位(默认是有小数位)
      var a = s.split(".");
      if (a[1] == "00") {
        s = a[0];
      }
    }
    return s;
  }
  /**
   * 生成guid
   * @returns {string}
   */
  static guid () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 深度复制 不能扩展对象
   * @param obj
   * @returns {any}
   */
  static deepClone (obj) {
    if (obj === null || typeof obj !== "object") {
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
  static deepCopy (p, c = {}) {
    for (var i in p) {
      if (!p.hasOwnProperty(i)) {
        continue;
      }
      if (typeof p[i] === "object") {
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
  static ceil (num) {
    let n = Math.ceil(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 向下取整  12.3 -> 12
   * @param num:Number
   * @return {Number} 整数
   * */
  static floor (num) {
    let n = Math.floor(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 把数四舍五入为最接近的整数。  12.1->12 / 12.8->13
   * @param num:Number
   * @return {Number} 整数
   * */
  static round (num) {
    let n = Math.round(num);
    return isNaN(n) ? 0 : n;
  }

  /**
   * 结果的小数点后有指定位数的数字。
   * @param num:Number
   * @param n:Number 保留位数
   * @return {Number}
   * */
  static toFixed (num, n) {
    let m = +(+num).toFixed(n);
    return isNaN(m) ? 0 : m;
  }

  /**
   * 隐藏16位银行卡信息
   * @param val:String 如：1234567891234567
   * @return {String} 123456******4567
   * */
  static hideBankCardNo (val) {
    return (
      val.substr(0, 6) +
      val.substr(6, val.length - 10).replace(/\d/g, "*") +
      val.substr(-4, 4)
    );
  }

  /**
   * 分转元
   * @param val 需要转化的金额 默认保留两位小数
   * @returns {String}
   */
  static ToYuan (val) {
    var num = val;
    num = val * 0.01 + "";
    var reg =
      num.indexOf(".") > -1 ?
        /(\d{1,3})(?=(?:\d{3})+\.)/g :
        /(\d{1,3})(?=(?:\d{3})+$)/g;
    num = num.replace(reg, "$1");
    num = Number(this.ToDecimal2(num));
    if(isNaN(num)){
      return 0
    }
    return num;
  }

  /**
   * 分转元辅助函数 消除精度问题;
   * @param x String
   * @return {string}
   * */
  static ToDecimal2 (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      throw new Error("请传入正确的数字!");
    }
    var f = Math.round(x * 100) / 100 + "";
    var rs = f.indexOf(".");
    if (rs < 0) {
      rs = f.length;
      f += ".";
    }
    while (f.length <= rs + 2) {
      f += "0";
    }
    return f;
  }

  /**
   * 元转分
   * @param y 金额元
   * @param n 转换倍数 默认1倍
   * @returns {Number}
   */
  static ToCent (y, n = 1) {
    var m = 0,
      s1 = y.toString(),
      s2 = n.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) { }
    try {
      m += s2.split(".")[1].length;
    } catch (e) { }
    let _result =   (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
    if(isNaN(_result)){
      return 0
    }
    return _result;
  }

  /**
   * 检测当前移动设备 ios/android
   * @return {ios/android}
   * */
  static CheckDevice(){
    var u = navigator.userAgent;
    var app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
      return 'android';
    }
    if(isIOS){
      return 'ios';
    }
  }

  /**
   * 大写转金额
   * @param n:Number 数字金额
   * @return {String} 中文金额
   * */
  static Arabia_To_Chinese(n) {
    var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var a = n.indexOf('-');
    if(a != -1){
      n = n.substring(1);
        var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
        if (indexpoint >= 0){
            n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
        }
        unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
        for (var i=0; i < n.length; i++){
            str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
        }
        return "负数"+str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1").replace(/^元零?|零分/g, "").replace(/元$/g, "元整").replace(/角$/g, "角整"); // 替换掉数字里面的零字符，得到结果
    }else{
        var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
        if (indexpoint >= 0){
            n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
        }
        unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
        for (var i=0; i < n.length; i++){
            str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
        }
        return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1").replace(/^元零?|零分/g, "").replace(/元$/g, "元整").replace(/角$/g, "角整"); // 替换掉数字里面的零字符，得到结果
    }
  }

  /**
   * 金额转大写
   *
   * */
}
