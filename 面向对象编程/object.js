/*
 * @Author: wsx
 * @Date: 2021-02-17 22:32:17
 * @LastEditTime: 2021-02-19 17:18:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /JS-reading/面向对象编程/object.js
 */

// 数据属性
//数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。数据属性有 4 个特性描述它们的行为。
// [[Configurable]]:表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特 性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特 性都是 true，如前面的例子所示。
// [[Enumerable]]:表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对 象上的属性的这个特性都是 true，如前面的例子所示。
// [[Writable]]:表示属性的值是否可以被修改。默认情况下，所有()((()直reset
// scrollToFirstscrollToFirst接定义在对象上的属性的 这个特性都是 true，如前面的例子所示。
// [[Value]]:包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性 的默认值为 undefined。
//在像前面例子中那样将属性显式添加到对象之后，[[Configurable]]、[[Enumerable]]和 [[Writable]]都会被设置为 true，而[[Value]]特性会被设置为指定的值。比如:
    let person = {
      name: "Nicholas"
};
//这里，我们创建了一个名为 name 的属性，并给它赋予了一个值"Nicholas"。这意味着[[Value]] 特性会被设置为"Nicholas"，之后对这个值的任何修改都会保存这个位置。
// 要修改属性的默认特性，就必须使用 Object.defineProperty()方法。这个方法接收 3 个参数: 要给其添加属性的对象、属性的名称和一个描述符对象。最后一个参数，即描述符对象上的属性可以包 含:configurable、enumerable、writable 和 value，跟相关特性的名称一一对应。根据要修改 的特性，可以设置其中一个或多个值。比如
let person = {}
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Nicholas'
})

console.log(person.name) // Nicholas
person.name = 'Greg'
console.log(person.name) // Nicholas

// 访问器属性
let book = {
    year_: 2017,
    edition: 1,
}

Object.defineProperty(book, 'year', {
    get() {
        return this.year_;
    },
    set(newValue) {
        if(newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    },
})
book.year = 2018;
console.log(book.edition)   // 2

// 定义多个属性
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if(newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
})

// 读取属性的特性
// 使用Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接受两个参数：
// 属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于访问器属性包含configurable,enumerable，get和set属性， 
// 对于数据属性包含configurable，enumerable,writable,value属性。比如：
let book = {}
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get : function() {
            return this.year_;
        },
        set: function(newValue) {
            if(newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
})

let descriptor = Object.getOwnPropertyDescriptor(book, 'year_')
console.log(descriptor.value)   // 2017
console.log(descriptor.configurable);   // false
console.log(typeof descriptor.get);     // 'undefined'

let descriptor = Object.getOwnPropertyDescriptor(book, 'year');
console.log(descriptor.value)   // undefined
console.log(descriptor.enumerable)   // false
console.log(typeof descriptor.get)  // 'function'

// 合并对象
// 简单复制
dest = {}
src = { id: 'src' }

result = Object.assign(dest, src);

// Object.assign(dest, src)
// Object.assign修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result);   // true
console.log(dest !== src);  // true
console.log(result);    // {id: src}
console.log(dest)   // {id: src}


// 多个源对象
dest = {};

result = Object.assign(dest, {a: 'foo'}, {b: 'bar'});

console.log(result);   // {a: foo, b: bar}


// 获取函数和设置函数
dest = {
    set a(val)  {
        console.log(`invoked dest setter with param ${val}`)
    }
}

src = {
    get a() {
        console.log('Invoked src getter');
        return 'foo'
    }
};

Object.assign(dest, src);
// 调用src的获取方法
// 调用dest的设置方法并传入'foo'
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来


console.log(dest);   // {set a(val) {...}}
// Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。此外，从源对象防蚊器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象。
// 换句话说， 不能在两个对象间转移获取函数和设置函数。
let dest, src, result;
// 覆盖属性
dest = { id: 'test' };
result = Object.assign(dest, { id: 'src1', a: 'foo'}, { id: 'src2', b: 'bar'});

// Object.assign 会覆盖重复的属性
console.log(result)   // {id: src2, a: foo, b: bar }

// 可以通过目标对象上的设置函数观察到覆盖的过程:
dest = {
    set id(x) {
        console.log(x);
    }
}

Object.assign(dest, {id: 'first'}, {id: 'second'}, {id: 'third'});
// first
// second
// third

