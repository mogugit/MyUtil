<!-- 记录日常开发常用工具类 -->
# MyUtil
记录工作中个人常用工具类

## 1. 工具函数
  1. 检测是否为空对象
  2. 检测数据类性
  3. 解析url参数
  4. 生成guid

## 2. 函数的节流(throttle)与防抖(debounce)
    1. 事件频繁触发可能造成的问题?
        1). 一些浏览器事件:window.onresize、window.mousemove等，触发的频率非常高，会造成浏览器性能问题
        2). 如果向后台发送请求，频繁触发，对服务器造成不必要的压力
    2. 如何限制事件处理函数频繁调用
        1). 函数节流
        2). 函数防抖
    3. 函数节流(throttle)
        1). 理解:
            在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
            适合多次事件按时间做平均分配触发
        2). 场景：
            窗口调整（resize）
            页面滚动（scroll）
            DOM 元素的拖拽功能实现（mousemove）
            抢购疯狂点击（click）
    4. 函数防抖(debounce)
        1). 理解:
            在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
            适合多次事件一次响应的情况
        2). 场景：
            输入框实时搜索联想（keyup/input）

## 3. 对象/数组拷贝
    1. 区别浅拷贝与深拷贝
        纯语言表达:
            浅拷贝: 只是复制了对象属性或数组元素本身(只是引用地址值)
            深拷贝: 不仅复制了对象属性或数组元素本身, 还复制了指向的对象(使用递归)
        举例说明: persons拷贝
            浅拷贝: 只是拷贝了每个person对象的引用地址值, 每个person对象只有一份
            深拷贝: 每个person对象也被复制了一份新的

## 4. 金额和数字转化
    1. 分转元辅助函数
    2. 元转分
    3. 金额转大写
    4. 隐藏16位银行卡信息
    5. 金额按千位逗号分割

## 5. 移动端工具方法
  1. 检测当前移动设备
