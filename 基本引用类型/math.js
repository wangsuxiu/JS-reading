/*
 * @Author: wsx
 * @Date: 2021-02-16 19:48:33
 * @LastEditTime: 2021-02-16 23:05:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /JS-reading/基本引用类型/math.js
 */

//  舍入方法
// Math.ceil()方法始终向上舍入为最接近的整数。
// Math.floor()方法始终向下舍入为最接近的整数。
// Math.round()方法执行四舍五入
// Math.fround()方法返回数值最接近的单精度(32位)浮点值表示
console.log(Math.ceil(25.9)) // 26
console.log(Math.ceil(25.5)) // 26
console.log(Math.ceil(25.1)) // 26

console.log(Math.round(25.9)) // 26
console.log(Math.round(25.5)) // 26
console.log(Math.round(25.1)) // 25

console.log(Math.fround(0.4)) //  0.4000000059604645
console.log(Math.fround(0.5)) // 0.5
console.log(Math.fround(25.9)) // 25.899999618530273

console.log(Math.floor(25.9)) // 25
console.log(Math.floor(25.5)) // 25
console.log(Math.floor(25.1)) // 25


// random方法
// Math.random()方法返回一个0-1范围内的随机数，其中包含0但不包含1。对于希望显示随机名或者随机新闻的网页，这个方法是非常方便的，可以基于以下公式从一组整数中随机选择一个随机数：
const number = Math.floor(Math.random() * total_number_of_choices + first_possible_value)

// 通过函数算出可选总数和最小可能的值
function selectFrom(lowerValue, upperValue){
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue)
}

