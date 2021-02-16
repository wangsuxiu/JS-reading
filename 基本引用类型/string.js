/*
 * @Author: wsx
 * @Date: 2021-02-02 11:53:20
 * @LastEditTime: 2021-02-04 12:21:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /JS-reading/基本引用类型/string.js
 */
let message = 'abc'
let stringIterator = message[Symbol.iterator]();


console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
 
// 字符串模式匹配方法
let text = "cat, bat, sat, fat";
let pattern = /.at/

let matches = text.match(pattern)

console.log(matches.index)

let text1 = 'cat, bat, sat, fat';
let pos = text1.search(/at/)
console.log(pos)

let text2 = 'cat, bat, sat, fat'
let result = text2.replace(/(.at)/g, "word ($1)");

// 获取global对象
let global = function() {
    return this
}()

console.log(result) 
console.log('global', global)