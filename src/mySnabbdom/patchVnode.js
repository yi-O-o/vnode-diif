/**
 * 专门做精细化比较
 */
import { createEle } from "./createEle";
import { updateChildren } from "./updateChildren.JS";
export function patchVnode(newVnode, oldVnode) {
  //比较2个Vnode是不是同一个对象
  if (oldVnode === newVnode) return
  //查看新虚拟节点是不是要写入test,还是写入children
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length === 0)) {
    console.log('精细化比较，新节点是文字');
    if (newVnode.text != oldVnode.text) {
      //直接用newVnode的文字替换到oldVnode.innerText属性
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    console.log('精细化比较，新节点是要写入子节点');
    if (oldVnode.text !== '' && (oldVnode.children == undefined || oldVnode.children.length === 0)) {
      console.log("老节点是text");
      // 1.清空老节点的innerText
      oldVnode.elm.innerText = null
      // 2.把新节点的children追加上去
      newVnode.children.forEach(item => {
        const newDom = createEle(item)
        oldVnode.elm.appendChild(newDom)
      })
    }else{
      console.log('老元素是子节点');
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
      // let un = 0 //为了防止oldVnode越界 un指向表示没有处理的DOM
      // for(let i = 0 ;i < newVnode.children.length; i++){
      //   //判断老节点的子节点和新节点的字节是不是同一个
      //   let newChVnode = newVnode.children[i]
      //   let isExist = false
      //   for(let j = 0; j <oldVnode.children.length ; j++ ){
      //     let oldChVnode = oldVnode.children[j] 
      //     if(newChVnode.sel === oldChVnode.sel && newChVnode.key === oldChVnode.key){
      //       isExist = true
      //       break
      //     }
      //   }
      //   if(!isExist){
      //    let newChDOM =  createEle(newChVnode)
      //    if(un >= oldVnode.children.length){
      //      oldVnode.elm.appendChild(newChDOM)
      //     }else{
      //       //上树
      //       oldVnode.elm.insertBefore(newChDOM,oldVnode.children[un].elm)
      //     }
      //   }else{
      //     un++
      //   }
      // }
    }
  }
  newVnode.elm = oldVnode.elm
}

 
  