/**
 * 1.虚拟DOM如何被渲染函数(h函数)产生：将h函数变成虚拟节点
 * 2.将虚拟节点变成真实节点
 */
import { h } from "./mySnabbdom/h";
import { patch } from "./mySnabbdom/patch";

const main = document.getElementById("main");
const btn = document.getElementById("btn");

// const vnode1 = h('ul',{},[
//     h('li',{},[
//         h('div',{},'你好')
//     ]),
//     h('li',{},"B"),
//     h('li',{},"C"),
//     h('li',{},"D")
// ])
const vnode = h("div", { key: "div" }, [
  h("div", { key: "B" }, "B"),
  h("div", { key: "A" }, "A"),
  h("div", { key: "C" }, "C"),
]);
//第一次上树
patch(main, vnode);

const vnode1 = h("div", { key: "div" }, [
  h("div", { key: "A" }, "AAAAA"),
  h("div", { key: "C" }, "CCCCCC"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "D" }, "D"),

]);
btn.onclick = function () {
  patch(vnode, vnode1);
};
