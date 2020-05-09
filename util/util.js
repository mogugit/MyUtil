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
      let
    }
   }

  /**
   * 元转分
   *
   *
   * */


  /**
   * 分转元
   *
   * */


  /**
   * 大写转金额
   *
   * */

  /**
   * 金额转大写
   *
   * */


  /**
   *
   *
   * */




}
