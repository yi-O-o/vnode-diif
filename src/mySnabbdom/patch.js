import vnode from "./vnode";
import { createEle } from "./createEle";
import {patchVnode} from './patchVnode'
export function patch(oldVnode, newVnode) {
  //判断oldVnode是DOM节点还是虚拟节点
  if (oldVnode.sel === "" || oldVnode.sel === undefined) {
    //是DOM节点
    oldVnode = createVnode(oldVnode);
  } 
    //比较是不是同一个虚拟节点
    if (oldVnode.sel === newVnode.sel && (oldVnode.key  === newVnode.key)) {
      //精细化比较
      patchVnode(newVnode,oldVnode)
    } else {
      //暴力删除，然后再加上去
      console.log("暴力删除");
      let newNode =  createEle(newVnode)
      //追加到旧节点前面
      oldVnode.elm.parentNode.insertBefore(newNode,oldVnode.elm)
      //删除旧节点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)

    }
  
}

function createVnode(oldVnode) {
  //仅支持包2层
  let children = [];
  if (Array.isArray(oldVnode.children)) {
    oldVnode.children.forEach((item) => {
      children.push(
        vnode(
          item.tagName.toLowerCase(),
          undefined,
          undefined,
          item.textContent,
          item
        )
      );
    });
  }
  return vnode(
    oldVnode.tagName.toLowerCase(),
    {},
    children,
    oldVnode.textContent,
    oldVnode
  );
}
