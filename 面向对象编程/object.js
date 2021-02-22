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

let dest, src, result;

// 覆盖属性
dest = { id: 'desc'}


result = Object.assign(dest, {id: 'src1', a:'foo'}, {id: 'src2', b: 'bar'});
console.log(result);   // {id: src2, a: foo, b: bar}

// 对象引用
dest = {}
src = { a: {}}

Object.assign(dest, src)
console.log(dest.a === src.a)  // true

let dest, src, result

// 错误处理
dest = {}
src = {
    a: 'foo',
    get b() {
        // Object.assign()在调用这个获取函数时会抛出错误
        throw new Error();
    },
    c: 'bar',
}

try {
    Object.assign(dest, src)
} catch (error) {
    
}
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在
console.log(dest)   // {a : foo}

// 对象标识及相等判度
// 这些情况在不同javascript引擎中表现不同，但仍被认为相等
console.log(+0 === -0)  // true
console.log(+0 === 0)   // true
console.log(-0 === 0)   // true

// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN)  // false
console.log(isNaN(NaN))   // true

// 为改善这类情况，ECMAScript6规范新增了Object.is(),这个方法与===很像，但同时也考虑到了上述边界情形。这个方法必须接受两个参数：
console.log(Object.is(true,1)) // false
console.log(Object.is({}, {})) // false
console.log(Object.is('2', 2)) // false

// 正确的0，-0，+0相等/不等判定
console.log(Object.is(+0,-0)) // false
console.log(Object.is(+0, +0))  // true
console.log(Object.is(-0,0))  // false

// 正确的NaN判度
console.log(Object.is(NaN)) // true
// 要检查超过两个值，递归地利用相等性传递即可：
function recursivelyCheckEqual(x,...rest) {
    return Object.is(x, rest[0])&& (rest.length < 2 || recursivelyCheckEqual(...rest))
}

// 增强的对象语法
// 简写方法名与可计算属性键相互兼容
const methodKey = 'sayName'
let person = {
    [methodKey](name){
        console.log(`my name is ${name}`)
    }
}


 // 嵌套解构
 let person = {
     name: 'Matt',
     age: 27,
     job: {
         title: 'Software engineer'
     }
 }

 let personCopy = {}

 ({name: personCopy.name, age: personCopy.age, job: personCopy.job} = person)

 // 因为一个对象的引用被赋值给personCopy,所以修改person.job对象的属性也会影响personCopy
 person.job.title = 'Hacker'

 console.log(person)
 // {name: 'Matt', age: 27, job: {title: 'Hacker'}}

 console.log(personCopy)
 // {name: 'Matt', age: 27, job: {title: 'Hacker'}}

 // 参考上下文匹配
 // 在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响arguments对象，但可以在函数签名中声明在函数体内使用局部变量：
 let person = {
     name: 'Matt',
     age: 27,
 }


// 创建对象
// 工厂模式
function createPerson(name, age, job){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}

let person1 = createPerson('Nichjolas', 29, 'software engineer')
let person2 = createPerson('Greg', 27, 'Doctor')

// 这种工厂模式虽然可以解决创建多个类似对象的问题， 但没有解决对象标识问题（即新建的对象是什么类型）。

// 构造函数模式
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name)
    }
}

let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')

person1.sayName();  // Nicholas
person2.sayName();  // Greg


// 在这个例子中， Person()构造函数代替了createPerson()工厂函数。实际上，Person()内容的代码跟createPerson（）基本是一致的，只有如下区别：
// 没有显示地创建对象
// 属性和方法直接赋值给了this
// 没有return

// 要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作：
//（1） 在内存中创建一个新对象
//（2） 这个新对象内部的[Prototype]特性被赋值为构造函数的prototype属性。
//（3） 构造函数内部的 this被赋值为这个新对象（即this指向新对象）。
//（4） 执行构造函数内部的代码（给新对象添加属性）。
//（5） 如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象。
console.log(person1.constructor == Person) // true
console.log(person2.constructor == Person) // true

// constructor本来是用来标识对象类型的。不过，一般认为instanceof操作符是确定对象类型更可靠的方式。前面例子中的每个对象都是Object的实例，也是Person的实例，如下面调用instanceof操作符的结果所示：
console.log(person1 instanceof Object)  // true
console.log(person1 instanceof Person)  // true
console.log(person2 instanceof Object)  // true
console.log(person2 instanceof Person) // true


// 构造函数也是函数

// 作为构造函数
let person = new Person('zhangsan', 29, 'Software Engineer')
person.sayName(); // zhangsan

// 作为函数
Person('zhangsan', 29, 'Software Engineer')
// 挂在window上面(在调用一个函数而没有明确设置this值的情况下（既没有作为对象的方法调用，或者没有使用call()/apply()调用）)，this始终指向Global对象，在浏览器中就是window对象
// 因此，在上面的调用之后，window对象上就有了sayName方法
window.sayName();  // zhangsan

//在另一个对象的作用域上调用
let o = new Object();
Person.call(o, 'Kristen', 25, 'Nurse')
o.sayName(); // Kristen


// 构造函数的问题
// 构造函数虽然有用， 但也不是没有问题。构造函数的问题在于，其定义的方法会在每个实例上都创建一遍，
// 因此对于前面的例子而言，person1和person2都有名为sayName()的方法，但这两个方法不是同一个ffunction实例。我们知道，ECMAscript中的函数是对象，因此每次定义函数时
// 都会初始化一个对象。逻辑上讲，这个构造函数实际上时这样的：
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job
    this.sayName= new Function('console.log(this.name)'); // 逻辑等价
}

// 这样理解这个构造函数就可以清楚的知道，每个Person实例都有自己的Function实例用于显示name属。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。但创建新Function实例的机制是一样的。因此不同实例上
// 的函数虽然同名却不相等，如下所示：
console.log(person1.sayName == person2.sayName)   // false
// 因为都是做一样的事，所以没要定义两个不同的Function实例。况且，this对象可以把函数与对象的绑定推迟到运行时。
// 要解决这个问题，可以把函数定义转移到构造函数外部：
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}


function sayName() {
    console.log(this.name);
}

let person1 = new Person('Nicholas', 29, 'Software Engineer');
let person2 = new Person('Greg', 27, 'Doctor');

person1.sayName()   // Nicholas
person2.sayName()   // Greg

// 在这里，sayName()被定在了构造函数外部。在构造函数内部，sayName属性等于全局sayName()函数。因为这一次sayName属性中包含的只是一个指向外部函数的指针
// 所以person1和person2共享了定义在全局作用域上的sayName()函数。这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数
// 实际上只能在一个对象上调用。
// 如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这回导致自定义类型引用的代码不能很好地聚集在一起。这个新问题可以通过原型模式来解决。

// 原型模式
// 每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，
// 在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型， 如下所示：
function Person(){}

Person.prototype.name = 'Nicholas'
Person.prototype.age = 20
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function(){
    console.log(this.name)
}

let person1 = new Person()
person1.sayName()  // Nicholas

let person2 = new Person()
person2.sayName() // Nicholas

console.log(person1.sayName == person2.sayName)  // true

// 使用函数表达式也可以，
let Person = function() {}

//....
Person.prototype.name = 'Greg'


// 理解原型
// 无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个prototype属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为constructor的属性，
// 指回与之关联的构造函数。对前面的例子而言，Person.prototype.contructor指向Person。然后，因构造函数而异，可能会给原型对象添加其他属性和方法。
// 在自定义构造函数时，原型对象默认只会获得constructor属性，其他的所有方法都继承自Object。每次调用构造函数创建一个新实例，这个实例的内部[Prototype]指针就会被赋值为构造函数的原型对象。
// 脚本中没有访问这个[Prototype]特性的标准方式，但Firefox,Sarari和Chrome会在每个对象上暴露__proto__属性，通过这个属性可以访问对象的原型。在其他实现中，这个特性完全被隐藏了。
// 关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。

// 这种关系不好可视化，但可以通过下面的代码来理解原型的行为：
// 构造函数可以是函数表达式
// 也可以是函数声明，因此下面两种形式都可以：
function Person {}
let Person = function(){}

// 声明之后，构造函数就有了一个
// 与之关联的原型对象
console.log(typeof Person.prototype)
console.log(Person.prototype)
// {
    //constructor: f Person(),
    //__proto__: Object
//}
// 如前所示，构造函数有一个prototype属性
// 引用其原型对象，而这个原型对象也有一个
// constructor属性，引用这个构造函数
// 换句话说，两者循环引用：
console.log(Person.prototype.constructor === Person)  // true


// 正常的原型链都会终止于Object的原型对象
// Object原型的原型是null
console.log(Person.prototype.__proto__ === Object.prototype)    // true
console.log(Person.prototype.__proto__.constructor === Object)  // true
console.log(Person.prototype.__proto__.__proto__ === null)  // true

console.log(Person.prototype.__proto__)
// {
// constructor: f Object,
// toString: ....
// hasOwnProperty: ...,
// isPrototypeOf: ...
//}


let person = new Person, person2 = new Person
console.log(person1 !== Person)   // true
console.log(person1 !== Person.prototype) // true
console.log(Person.prototype !== Person) // true

//  实例通过__proto__连接到原型对象
// 构造函数通过prototype连接到原型对象
// 实例与构造函数没有直接联系，与原型对象有直接联系
console.log(person1.__proto__ === Person.prototype)  // true
console.log(person1.__proto__.constructor === Person)  // true 


// 同一个构造函数创建的两个实例
// 共享同一个原型对象
console.log(person1.__proto__ === person2.__proto__)  // true

// instanceof检查实例的原型链中
// 是否包含指定构造函数的原型
console.log(person1 instanceof Person)   // true
console.log(person2 instanceof Object)   // true
console.log(Person.prototype instanceof Object)  

console.log(Person.prototype.isPrototypeOf(person1))   // true
console.log(Person.prototype.isPrototypeOf(person2))   // true
// 这里通过原型对象调用isPrototypeOf()方法检查了person1和person2。因为这两个例子内部都有链接指向Person.prototype,所以结果都返回true
// ECMAScript的Object类型有一个方法叫Object.getPrototypeOf()，返回参数的内部特性[Prototype]的值。例如：
console.log(Object.getPrototypeOf(person1) === Person.prototype)   // true
console.log(Object.getPrototypeOf(person2) === Person.prototype)   // triue
console.log(Object.getPrototypeOf(oerson).name)  // Nicholas

// Object类型还有一个setPrototypeOf()方法，可以向实例的私有特性[prototype]写入一个新值。这样就可以重写一个对象的原型继承关系。
let biped = {
    numLegs: 2
}

let person = {
    name: 'Matt'
}

Object.setPrototypeOf(person, biped)

console.log(person.name)  // Matt
console.log(person.numLegs) // 2
console.log(Object.getPrototypeOf(person)=== biped)  // true

// 为避免使用Object.setPrototypeOf()可能造成的性能下降，可以通过Object.create()来创建一个新对象，同时为其指定原型：
let biped ={
    numLegs: 2
}

let person = Object.create(biped)
person.name = 'Matt'

console.log(person.name)   // Matt
console.log(person.numLegs)  // 2
console.log(Object.getPrototypeOf(person) === biped)  // true


// 如果要确定某个属性是否存在于原型上，则可以像下面这样同时使用hasProperty()和in操作符：
function hasPrototypeProperty(object,name){
    return !object.hasOwnProperty(name) && (name in object)
}

// 属性枚举顺序
// for-in循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()以及Object.assign()在属性枚举顺序方面有很大区别。
// for-in循环和Object.keys()的枚举顺序是不确定的，取决于Javascript引擎，可能因浏览器而异。

// Object.getOwnPropertyNames()、Object.getOwnPertySymbols()和Object.assign()的枚举顺序是确定性的。先以升序枚举数值键，然后以插入顺序枚举字符串和符号键。
// 在对象字面量中定义的键以它们逗号分隔的顺序插入。
let k1 = Symbol('k1')
let k2 = Symbol('k2')


let o = {
    1: 1,
    first: 'first',
    [k1]: 'sym2',
    second: 'second',
    0: 0,
}

o[k2] = 'sym2';
o[3] = 3;
o.third = 'third'
o[2] = 2

console.log(Object.getOwnPropertyNames(o))
// ['0', '1', '2', '3', 'first', 'second', 'third']


console.log(Object.getOwnPropertySymbols(o))
// [Symbol(k1), Symbol(k2)]

// 对象迭代
// 在Javascript有史以来的大部分时间内，迭代对象属性都是一个难题。ECMAScript 2017新增了两个静态方法，用于将对象内容转换为序列化的-------格式。
// 这两个静态方法Object.values()和Object.entries()接受一个对象，返回它们内容的数组。Object.values()返回对象值的数组，Object.entries()返回键/值对的数组
// 下面的示例展示了这两个方法：
const o = {
    foo: 'bar',
    baz:  1,
    qux: {}
}

console.log(Object.values(o))  // ['bar', 1, {}]
console.log(Object.entries(o)) // [['foo', 'bar'], ['baz', 1], ['qux', {}]]

// 注意，非字符串属性会被转换为字符串输出。另外，这两个方法执行对象的浅复制:
const o = {
    qux: {}
}

console.log(Object.values(o)[0] === o.qux)   // true

console.log(Object.entries(o)[0][1] === o.qux)  // true

// 符号属性会被忽略:
const sym = Symbol()
const o ={
    [sym]: 'foo'
}

console.log(Object.values(o))   // []

console.log(Object.entries(o))  // []

// 其他原型方法
let friend = new Person()
console.log(friend instanceof Object)   // true
console.log(friend instanceof Person)   // true
console.log(friend.constructor == Person)  // false 
console.log(friend.constructor == Object) // true

// 这里，instanceof仍然对Object和Person都返回true。但constructor属性现在等于Object而不是Person了。如果constructor的值很重要，则可以像下面这样在重写原型对象时专门设置一下它的值：
function Person(){}

Person.prototype = {
    constructor: Person,
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName() {
        console.log(this.name)
    }
}

// 需要注意的是，以这种方式恢复constructor属性会创建一个[[Enumberable]]为true的属性。而原生constructor属性默认是不可枚举的。因此，如果你使用的是兼容ECMAScript的Javascript引擎，
// 那可能会改为使用Object.defineProperty()方法来定义constructor属性：
function Person(){}

Person.prototype = {
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName() {
        console.log(this.name)
    }
}

// 恢复costructor 属性
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person,
})


// 原型的动态性
// 因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对象所作的修改也会在实例上反应出来。下面是一个例子：
let friend = new Person()

Person.prototype.sayHi = function(){
    console.log('hi')
}
friend.sayHi();  // 'hi'  没问题

// 以上代码先创建一个Person实例并保存在friend中。然后一条语句在Person.prototype上添加了一个名为sayHi()的方法。虽然friend实例是在之前创建的，但它仍然可以访问这个方法。


function Person(){}

let friend = new Person()
Person.prototype = {
    constructor: Person,
    name: 'Nicholas',
    age: 20,
    job: 'Software Engineer',
    sayName() {
        console.log(this.name)
    }
}
friend.sayName()
// 在这个例子中， Person的新实例是在重写原型对象之前创建的。在调用friend.sayName()的时候会导致错误。这是因为friend指向的原型还是最初的原型，而这个原型上并没有sayName属性，
// 重写构造函数上的原型之后再创建的实例才会引用新的原型。而再此之前创建的实例仍然会引用最初的原型。


// 原型的问题
// 原型模式也不是没有问题。首先，他弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性。虽然这会带来不便，但还不是原型的最大问题。
// 原型的主要问题源自它的共享属性。

// 我们知道，原型上的所有属性是在实例间共享的，这对函数来说比较合适。另外包含原始值的属性也还好，如前面例子中所示，可以通过在实例上添加同名属性来简单地遮蔽原型上的属性。
// 真正的问题来自包含引用值的属性，来看下面的例子：
function Person(){}

Person.prototype = {
    constructor: Person,
    name: 'Nicholas',
    age:29,
    job: 'Software Engineer',
    friends: ["Shelby", "Court"],
    sayName() {
        console.log(this.name)
    }
}

let person1 = new Person()
let person2 = new Person()

person1.friends.push('Van')

console.log(persson1.friends)  // 'Shelby, Court, Van'
console.log(person2.friends)   // 'Shelby, Court, Van'
console.log(person1.friends === person2.friends)  // true

// 继承
// 重温一下构造函数，原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另外一个类型的实例呢？
// 那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想。
// 实现原型链涉及如下代码模式：
function SuperType(){
    this.property = true
}

SuperType.prototype.getSuperValue = function(){
    return this.property
}

function SubType(){
    this.subproperty = false
}

// 继承SuperType
SubType.prototype = new SuperType()

SubType.prototype.getSubValue =  function(){
    return this.subproperty
}
let instance = new SubType()
console.log(instance.getSuperValue())  // true

// 由于SubType.prototype 的constructor属性被重写为指向SuperType，所以instance.constructor也指向SuperType。

// 默认原型
// 任何函数的默认原型都是一个Object的实例，这意味着这个实例有一个内部指针指向Object.prototype。这也是为什么自定义类型能够继承包括toString()，valueof()在内的
// 所有默认方法的原因


// 盗用构造函数
function SuperType(){
    this.colors = ['red', 'blue','green']
}

function SubType(){
    // 继承SuperType
    SuperType.call(this)
}

let instance = new SubType()
instace.colors.push('black')
console.log(instance.colors)   // 'red, blue, green, black'

let instance1 = new SubType()
console.log(instance1)    // "red, blue, green"


// 组合继承(构造函数 + 原型)
function SuperType(name){
    this.name= name;
    this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function(){
    console.log(this.name)
}

function SubType(name, age){
    // 继承属性
    SuperType.call(this, name)
    this.age = age
}

// 继承方法
SubType.prototype = new SuperType()

SubType.prototype.sayAge = functio(){
    console.log(this.age)
}

let insatnce1 = new SubType('Nicholas', 29)
instance1.colors.push('black')   // "red, blue, green, black"
instance1.sayName()   // Nicholas
instance1.sayAge()    // 29

let instance2 = new SubType('Greg', 27)
console.log(instance2.colors)   // "red, blue, green"
instance2.sayName()     // Greg
instance2.sayAge()      // 27

// 原型式继承
function object(o) {
    function F(){}
    F.prototype = o
    return new F()
}
// 这个object函数会创建一个临时的构造函数，将传入的对象赋值给这个构造函数的原型对象，然后返回这个临时类型的一个实例
// 本质上，object()是对传入的对象执行了一次浅复制，来看下面的例子：
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
}

let anotherPerson = object(person)
anotherPerson.name = 'Greg'
anotherPerson.friends.push('Rob')

let yetAnotherPerson = object(person)
yetAnotherPerson.name = 'Linda'
yetAnotherPerson.friends.push('Barbie')

console.log(person.friends)   // "Shelby, Court, Van, Rob, Barbie"

// ECMAScript5通过增加Object.create()方法将原型式继承的概念规范化了。这个方法接受两个参数：
// 作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选），在只有一个参数时，Object.create()与这里的object()方法效果相同：
let person = {
    name: 'Greg',
    friends:['Shelby', 'Court', 'Van']
}

let anotherPerson = Object.create(person)
// ...

// 寄生式继承
function createAnother(original){
    let clone = object(original)
    clone.sayHi = function(){
        console.log('hi')
    }
    return clone
} 

let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
}

let anotherPerson = createAnother(person)
anotherPerson.sayHi()  // hi

// 寄生式组合继承
function SuperType(name){
    this.name = name
    this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function(){
    console.log(this.name)
}

function SubType(name, age){
    SuperType.call(this, name)
    this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function(){
    console.log(this.age)
}

// 缺点：父类构造函数调用两次

function inheritPrototype(subType, superType){
    let prototype = object(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}

