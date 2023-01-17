/**
 * 创建新节点
 * 查看新节点是是否有子节点
 * 如果有递归
 * 最终效果是让他们变成真正的dom
 */
export function  createEle (vnode){
    // console.log('vnode',vnode);
    //创建节点 domNode是递归的那一个节点不是最大的那一个节点
    let domNode = document.createElement(vnode.sel)
    //在有text并且没有孩子的情况下
    if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)){
        //加载文字
        domNode.innerText = vnode.text
        
    }else if(vnode.children.length > 0 && vnode.text === undefined){
        //有子节点
        vnode.children.forEach(item => {
            //递归子节点，这时候父元素就是他的父节点
                let chNode =createEle(item)
                //上树
                domNode.appendChild(chNode)
        });
        
    }
    //把节点放在vnode.elm中
    vnode.elm = domNode
    return domNode
}