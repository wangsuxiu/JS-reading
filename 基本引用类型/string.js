/*
 * @Author: wsx
 * @Date: 2021-02-02 11:53:20
 * @LastEditTime: 2021-02-02 11:58:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /JS-reading/基本引用类型/string.js
 */
let message = 'abc'
let stringIterator = message[Symbol.iterator]();


console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
