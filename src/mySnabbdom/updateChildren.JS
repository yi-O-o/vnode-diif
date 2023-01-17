/**
 * 专门做精细化比较
 */
import { patchVnode } from "./patchVnode";
import { createEle } from "./createEle";

function sameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key ? true : false;
}

export function updateChildren(parentElm, oldCh, newCh) {
  //新前
  let newStartIdx = 0;
  //新后
  let newEndIdx = newCh.length - 1;
  //旧前
  let oldStartIdx = 0;
  //旧后
  let oldEndIdx = oldCh.length - 1;
  //新前虚拟DOM
  let newStartVnode = newCh[0];
  //新后虚拟DOM
  let newEndVnode = newCh[newEndIdx];
  //旧前虚拟DOM
  let oldStartVnode = oldCh[0];
  //旧后虚拟DOM
  let oldEndVnode = oldCh[oldEndIdx];
  //keyMap
  let keyMap = new Map();

  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    // debugger
    if (oldStartVnode == undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(newStartVnode, oldStartVnode)) {
      //命中新前与旧前,新前&旧前向下移动
      console.log("1.命中新前与旧前");
      patchVnode(newStartVnode, oldStartVnode);
      newStartVnode = newCh[++newStartIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (sameVnode(newEndVnode, oldEndVnode)) {
      //命中新后与旧后，新后&旧后向上移动
      console.log("2.命中新后与旧后");
      patchVnode(newEndVnode, oldEndVnode);
      newEndVnode = newCh[--newEndIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(newEndVnode, oldStartVnode)) {
      //命中新后与旧前，新后向上移动，旧新向下移动
      //移动节点，把新后的节点移动到旧后的后面
      console.log("3.命中新后与旧前");
      patchVnode(newEndVnode, oldStartVnode);
      //移动节点
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      newEndVnode = newCh[--newEndIdx];
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (sameVnode(newStartVnode, oldEndVnode)) {
      //命中新前与旧后
      //移动新前的节点到旧前的前面
      console.log("4.命中新前与旧后");
      patchVnode(newStartVnode, oldEndVnode);
      //移动节点
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      newStartVnode = newCh[++newStartIdx];
      oldEndVnode = oldCh[--oldEndIdx];
    } else {
      console.log("4种方式都不能命中");
      for (let i = oldStartIdx; i <= oldEndIdx; ++i) {
        keyMap.set(oldCh[i].key, i);
      }
      let oldKeyToIdx = keyMap.get(newStartVnode.key);
      if (oldKeyToIdx) {
        console.log("老节点里面有，移动位置");
        let elmMoveTo = oldCh[oldKeyToIdx];
        patchVnode(newStartVnode, elmMoveTo);
        parentElm.insertBefore(elmMoveTo.elm, oldStartVnode.elm);
        oldCh[oldKeyToIdx] = undefined;
      } else {
        //老节点里面没有，新增节点
        console.log("老节点里面没有，新增");
        console.log("newStartVnode", newStartVnode);
        parentElm.insertBefore(createEle(newStartVnode), oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  //这里是跳出循环准备要删除或者新增东西
  if (newStartIdx <= newEndIdx) {
    //新增节点
    console.log("调出循环,新增节点");
    //标杆
    const before =
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    console.log("before", before);
    for (let i = newStartIdx; i <= newEndIdx; ++i) {
      console.log("newCh[i]", newCh[i]);
      parentElm.insertBefore(createEle(newCh[i]), before);
    }
  }

  if (oldStartIdx <= oldEndIdx) {
    //删除节点
    console.log("跳出循环，删除节点");
    for (let i = oldStartIdx; i <= oldEndIdx; ++i) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
