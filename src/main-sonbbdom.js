import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // 通过传入模块初始化 patch 函数
  classModule, // 开启 classes 功能
  propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  eventListenersModule, // 添加事件监听
]);
const container = document.getElementById('container')
//创建虚拟dom
const vnode = h('a',{props:{href:'http://www.baidu.com',target:'_black'}},'百度') 
const vnode1 = h('ul',{class:{'a':true},style:{width:'200px'}},[
    h('li',{},["我的",
        h('p',{},'你的')
    ]),
    h('li',{},'哈的的'),
    h('li',{},'哈的'),
    h('li',{},'他的')
])
//让虚拟节点挂载到dom树上
patch(container,vnode1)
