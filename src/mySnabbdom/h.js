import vnode from './vnode'
/**
 * 这里的h(函数只考虑3中参数)
 * sel:标签
 * data:属性
 * []|h()|text:文字
 */
export function h(sel,data,c)  {
    if(arguments.length !== 3){
        throw Error("传入的参数有问题，只能是三个")
    }else if(typeof(c) == "string" || typeof(c) == 'number'){
        //1. h('div',{},"我")
        return vnode(sel,data,undefined,c,undefined)
    }else if(typeof(c) == 'object' && c.hasOwnProperty('sel')){
        //2. h('div',{},h('div',{},'name'))
        let children = []
        children.push(c)
        return vnode(sel,data,children,undefined,undefined)
    }else if(Array.isArray(c)){
        //3. h('div',{},['我的',h('div',{},'你饿')])
        let text = undefined
        let children = []
        c.forEach(item => {
            if(typeof item === 'string' || typeof item === 'number'){
                text = item
            }else
            children.push(item)
        })
        return vnode(sel,data,children,text,undefined)
    }else{
        throw Error('输入有错误')
    }
}