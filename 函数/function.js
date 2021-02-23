// 参数扩展与收集
// 扩展参数
let  values = [1, 2, 3, 4, 5]
function getSum(){
    let sum = 0;
    for(let i= 0; i< arguments.length; ++i) {
        sum += arguments[i]
    }
    return sum
}

// 借用apply
getSum.apply(null, values)

// 扩展操作符
getSum(...values)



// 收集参数
function getSum(...values){
    return values.reduce((x,y) => x + y, 0)
}

// 不可以
function getProduct(...values, lastValue){

}

// 可以
function ignoreFirst(firstValue, ...values){
    console.log(values)
}

// 箭头函数虽然不支持arguments对象，但支持收集参数的定义方式，因此也可以实现与使用arguments一样的逻辑
let getSum = (...values) => {
    return values.reduce(()=> x + y, 0)
}

// 函数作为值
function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument)
}

function createComparisonFunction(property){
    return function(object1, object2){
        let value1= object1[property]
        let value2 = object2[property]
        if(value1 < value2) {
            return -1
        }else if(value1 > value2){
            return 1;
        }else{
            return 0
        }
    }
}

// 函数内部
// arguments
function factorial(num){
    if(num <=1){
        return 1
    }else{
        return num * factorial(num -1)
    }
}


// 使用arguments.callee就可以让 函数逻辑与函数名解耦
function factorial(num){
    if(num<=1){
        return 1
    }else{
        return num * arguments.callee(num -1)
    }
}


// this
// 它在标准函数和箭头函数中有不同的行为
// 在标准函数中，this引用的是把函数当成方法调用的上下文对象，这时候通常称其为this值（在网页的全局上下文中调用函数时，this指向windows）,来看下面的例子：
window.color = 'red'
let o = {
    color: 'blue'
}
function sayColor(){
    console.log(this.color)
}

sayColor()   // red
o.sayColor = sayColor
o.sayColor // blue


// 在箭头函数中，this引用的是定义箭头函数的上下文。
window.color = 'red'
let o = {
    color: 'blue'
}

let sayColor = ()=> console.log(this.color)

sayColor()    // red   箭头函数时定义在window上的

o.sayColor = sayColor
o.sayColor()   // red

// 在事件回调或定时回调中调用某个函数时，this指向的并非想要的对象，此时将回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的this会保留定义该函数的上下文。
function King(){
    this.royaltyName = 'Henry'
    // this引用King的实例
    setTimeout(()=> console.log(this.royaltyName), 1000)
}

function Queen(){
    this.royaltyName = 'Elizabeth'

    // this引用window对象
    setTimeout(function(){
        console.log(this.royaltyName)
    }, 1000)
}

new King()   // Henry
new Queen()  // undefined

//函数名只是保存指针的变量。因此全局定义的sayColor()函数和o.sayColor()是同一个函数，只不过执行的上下文不同。

// caller
// 这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为null,不如：
function outer(){
    inner()
}

function inner(){
    console.log(inner.caller)
}

// 以上代码会显示outer()函数的源代码。这是因为outer()调用了inner()，inner.caller指向outer()。如果要降低耦合度，则可以通过arguments.callee.caller来引用同样的值。
function outer(){
    inner()
}

function inner(){
    console.log(arguments.callee.caller)
}

outer()

// 函数属性和方法
// ECMAScript5出于同样的目的定义了一个新方法：bind()。bind()方法会创建一个新的函数实例，其this值会被绑定到传给bind的对象，比如：
window.color ='red'
var o ={
    color: 'blue'
}

function sayColor(){
    console.log(this.color)
}

let objectSayColor = sayColor.bind(o)
objectSayColor()     // blue

// 尾调用优化（待看）
function fib(n){
    if(n < 2){
        return n
    }

    return fib(n-1) + fib(n-2)
}

// 尾调用优化之后
'use strict'

// 基础框架
function fib(){
    return fibImpl(0,1,n)
}

// 执行递归
function fibImpl(a,b,n){
    if(n===0){
        return a
    }
    return fibImpl(b, a+b, n-1)
}

// 闭包
// 闭包指的是那些引用了另一个函数作用域中变量的函数， 通常在嵌套函数中实现的。
// 比如，下面的函数
function createComparisonFunction(propertyName){
    return function(object1,object2){
        let value1= object1[propertyName]
        let value2 = object2[propertyName]
        if(value1< valu2){
            return -1
        }else if(value1 > value2){
            return 1
        }else{
            return 0
        }
    }
}

// 闭包（再好好看看把）

// this对象
// 匿名函数在这种情况下不会绑定到某个对象，这就意味着this 会指向window,除非在严格模式下this是undefined。
// 不过由于闭包的写法所致，这个事实有时候不容易看出
window.identity = 'The Window'

let object = {
    identity: 'My Object',
    getIdentityFunc(){
        return function(){
            return this.identity
        }
    }
}

console.log(object.getIdentityFunc()())   // 'The Window'

// 每个函数在被调用时都会创建两个特殊变量:this和arguments。内部函数永远不可能直接访问外部函数的这两个变量。但是，如果把this保存带闭包可以访问的另一个变量中，则是行得通的。
// 比如：
window.identity = 'The Window'

let object = {
    identity: 'My Object',
    getIdentityFunc(){
        let that = this 
        return function(){
            return that.identity;
        }
    }
}


console.log(object.getIdentityFunc()())   // My Object

// this和arguments都不能直接在内部韩式中访问的。如果想访问包含作用域中的arguments对象，则同样需要将其引用先保存到闭包能访问的另一个变量中。

// 在一些特殊的情况下，this只可能并不是我们期待的值。比如下面这个修改后的例子：
window.identity = 'The Window'

let object = {
    identity: 'My Object',
    geIdentity(){
        return this.identity
    }
}

console.log(object.geIdentity)   // My Object
(object.getIdentity)()    // My Object
(object.getIdentity = object.getIdentity)()  // 'The  Window'


// 第三行执行了一次赋值，然后再调用赋值后的结果。因为赋值表达式的值是函数本身，this值不再与任何对象绑定，所以返回的是'The Window'

// 内存泄漏
// 在这些版本的IE中，把HTML元素保存在某个闭包的作用域中，就相当于宣布该元素不能被销毁。
function assignHandler(){
    let element = document.getElementById('someElement')
    element.onClick = ()=> console.log(element.id)
}

// 以上代码创建了一个闭包，即element元素的时间处理程序。而这个处理程序又创建了一个循环引用。匿名函数引用着assignHandler()的活动对象，阻止了对element的引用计数归零。
// 只要这个匿名函数存在，element的引用技术就至少等于1.也就是说，内存不会被回收。其实这个例子稍加修改， 就可以避免这种情况，比如：
function assignHandler(){
    let element = document.getElementById('someElement')
    let id = element.id

    element.onClick = ()=> console.log(id)

    element = null
}

// 立即调用的函数表达式
// 立即调用的匿名函数又被称作立即调用的函数表达式。它类似于函数声明， 但由于被包括在括号中，所以被解释为函数表达式。紧跟在第一组括号后面的第二组括号会立即调用前面的函数表达式
(function(){
    // 块级作用域
})()

// 使用IIFE可以模拟块级作用域，即在一个函数表达式内声明变量，然后立即调用这个函数。这样位于函数体作用域中的变量就像是在块级作用域中一样。ECMAScript尚未支持块级作用域，使用IIFE模拟块级作用域是相当普遍的。
// IIIFE
(function(){
    for(var i =0;i< count;i++){
        console.log(i)
    }
})()

console.log(i)   // 抛出错误

//  说明IIFE用途的一个实际的例子，就是可以用它锁定参数值
let divs = document.querySelectorAll('div')

// 达不到目的
for(var i =0 ;i<divs.length;++i){
    divs[i].addEventListener('click', function(){
        console.log(i)
    })
}

// 解决办法
let divs = document.querySelectorAll('div')

for(var i=0;i<divs.length;i++){
    divs[i].addEventListener('click', (function(frozenCounter){
        return function(){
            console.log(frozenCounter)
        }
    })(i))
}

// 而使用ECMAScript块级作用域变量，就不用那么大动干戈了：
let divs = document.querySelectorAll('div')

for(let i =0;i<divs.length;++i){
    divs[i].addEventListener('click', function(){
        console.log(i)
    })
}

// 但要注意，如果把变量声明拿到for循环外部，那就不行了。下面这种写法会碰到跟在循环中使用var i=0同样的问题：
let divs = document.querySelectorAll('div')

let i 
for(i =0; i< divs.length;++i){
    divs[i].addEventListener('click', function(){
        console.log(i)
    })
}


