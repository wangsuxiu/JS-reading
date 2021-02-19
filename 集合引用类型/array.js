/*
 * @Author: wsx
 * @Date: 2021-02-16 23:18:00
 * @LastEditTime: 2021-02-17 22:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /JS-reading/集合引用类型/array.js
 */

// Array.form()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个length属性和可索引元素的结构

// 字符串会被拆分为单字符数组
console.log(Array.from('Matt'))  // ['M','a', 't', 't']

// 可以使用form 将集合或映射转换为一个新数组
const m = new Map().set(1,2).set(3,4)
const s = new Set().add(1).add(2).add(3).add(4)
console.log(Array.from(m))  // [[1, 2], [3,4]]
console.log(Array.from(s)) // [1, 2, 3, 4]

// Array.from 对现有数组执行浅复制
const a1 = [1,2,3,4]
const a2 = Array.from(a1)

console.log(a2)  // [1,2,3,4]
console.log(a1 === a2)  // false

// 可以使用任何迭代对象
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}

console.log(Array.from(iter)) // [1,2,3,4]

// arguments对象可以轻松的转换为数组
function getArgaArray(){
    return Array.from(arguments)
}

console.log(getArgaArray(1,2,3,4)) // [1,2,3,4]

// from也可以转换带有必要属性的自定义对象
const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
}

console.log(Array.from(arrayLike))  // [1,2,3,4]

// Array.from()还接受第二个可选的映射参数函数，这个函数可以增强新数组的值，而无需调用Array.form().map()创建中间数组，
// 还可以接受第三个可选参数，用于指定指定映射函数中this的值，但这个重写的this值在箭头函数中不适用。
const a1 = [1, 2, 3, 4]
const a2 = Array.from(a1, x=> x ** 2)
const a3 = Array.from(a1, function(x){return x ** this.exponent}, {exponent: 2})

// 数组空位
console.log(Array.of(...[,,,])) // [undefined, undefined, undefined]
for(const [index, value] of a1.entries()){
    alert(value)
}

// 数值索引
//  通过修改length属性，可以从数组末尾删除或添加元素
let colors = ['red', 'blue', 'green'];
colors.length = 2
alert(colors[2]) // undefined

let colors1 = ['red', 'blue', 'green']
colors.length = 4
alert(colors[3])  // undefined


// 检测数组， 要在同一个全局执行上下文
if(value instanceof  Array){
    // 操作数组
}

// 不用管它是在哪个全局执行上下文中创建的
if(Array.isArray(value)) {
    // 操作数组
}

//迭代器方法
// keys, values, entries
const a = ['foo', 'bar', 'baz', 'qux']
// 因为这些方法都返回迭代器，所以可以将他们的内容
// 通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys())
const aValues = Array.from(a.values())
const aEntries = Array.form(a.entries())


console.log(aKeys)   // [0,1,2,3]
console.log(aValues) // ['foo', 'bar', 'baz', 'qux']
console.log(aEntries)  // [[0, 'foo'], [1, 'bar'], [1, 'baz'], [2, 'qux']]

// 复制和填充方法
// copyWithin(), fill()
const zeroes = [0,0,0,0,0]

// 用5填充数组
zeroes.fill(5)
console.log(zeroes)  [5,5,5,5,5]
zeroes.fill(0)  // 重置

// 用6填充索引大于等于3的元素
zeroes.fill(6, 3)
console.log(zeroes)  [0,0,0,6,6]
zeroes.fill(0)

// 用7填充索引大于等于1且小于3的元素
zeroes.fill(7, 1, 3)
console.log(zeroes)  // [0, 7, 7, 0, 0]
zeroes.fill(0)

// 用8填充索引大于等于1且小于4元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1)
console.log(zeroes);  // [0,8,8,8,0]

// fill()静默忽略超出数组边界，零长度及方向相反的索引范围
const zeroes1 = [0,0,0,0,0]


// 索引过低忽略
zeroes.fill(1, -10,-6)
console.log(zeroes)   // [0,0,0,0,0]

// 索引过高，忽略
zeroes.fill(1, 10, 15)
console.log(zeroes)  // [0,0,0,0,0]

// 索引反向，忽略
zeroes.fill(2,4,2)
console.log(zeroes)  // [0,0,0,0,0]

// 索引部分可用，填充可用部分
zeroes.fill(4,3,10)
console.log(zeroes)  // [0,0,0,4,4]

// 在源索引或目标索引到达数组边界时停止

let ints;
ints.copyWithin(5);
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] reset();

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置 
ints.copyWithin(0, 5);
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]


// 转换方法
// toString(),valueOf(),其中valueOf()返回的还是数组本身，而toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分割的字符串，也就是说对数组的每个值都会调用其toString()方法，以得到最终的字符串
let colors = ['red', 'blue', 'green']
alert(colors.toString())   // red, blue, green
alert(colors.valueOf())   // red, blue, green
alert(colors)  // red, blue, green
// 如果数组中某一项是null或undefined，则在join()、toLocaleString()、 toString()和 valueOf()返回的结果中会以空字符串表示。

// 排序方法
//  默认情况下，sort()方法会按照升序重新排列数组元素，即最小的值在前面，最大的值在后面。为此，sort()会在每一项上调用String()转型函数，然后比较i富川来决定顺序，即使数组的元素是数值，也会先把数组转换为字符串再比较，排序，比如：
let values = [0,1,5, 10, 15]
values.sort()
alert(values) // // 0,1,10,15,5 
// 一开始数组中数值的顺序是正确的，但调用 sort()会按照这些数值的字符串形式重新排序。因此， 即使 5 小于 10，但字符串"10"在字符串"5"的前头，所以 10 还是会排到 5 前面。很明显，这在多数情 况下都不是最合适的。为此，sort()方法可以接收一个比较函数，用于判断哪个值应该排在前面。

// 操作方法
let colors = ['red', 'green', 'blue']
let colors1 = colors.concat('yellow', ['black', 'brown'])
console.log(colors)  // ['red', 'green', 'blue']
console.log(colors1)  // ['red', 'green', 'blue', 'yellow', 'black', 'brown']

// 归并方法
// reduce 和reduceRight
// 可以使用 reduce()函数执行累加数组中所有数值的操作，比如: let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
    alert(sum);  // 15

// Map
// 使用 new 关键字和 Map 构造函数可以创建一个空映射: 
const m = new Map();

// 使用嵌套数组初始化映射 
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);

console.log(m1.size())  // 3



