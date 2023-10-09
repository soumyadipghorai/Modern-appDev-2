let xx = {"a" : 5, "b" : "hello"}; 
console.log(xx); 

// add is an method of xx object 
xx.add = function(x, y){
    return x+y;
}

console.log(typeof(xx));
console.log(typeof(xx.add));
console.log(typeof(xx.add(3, 4)), xx.add(3, 4));

// adds x with xx['a']
xx.f = function(x){
    return this.a + x; // self == this
}

console.log(xx.f(10)); 

let x = {a: 1, b: 2};
let y = x; 
console.log(x); 
console.log(y); 
x.a = 3;
console.log(x); 
console.log(y); // changes the value in y too 

// after spreading you can store explicit values 
let z = {...x}; 
x.a = 5
console.log(x);
console.log(y);
console.log(z);

// getter and setter 
let user = {
    first: "albert", 
    last: "pinto", 
    get full(){
        return this.first + ' ' + this.last;
    }, 
    set full(f) {
        const parts = f.split(' '); 
        this.first = parts[0]; 
        this.last = parts[1];
    }
}

console.log(user.full);
user.full = "s ghorai"; 
console.log(`Now ${user.first} and ${user.last}`); 

let x1 = {"a" : 5, 
    "b" : "hello", 
    "addNum" : function(x, y){
        return x+y + this.a;
    }
}

console.log(x1.addNum(3, 4))

let z1 = x1.addNum; 
console.log(z1);
console.log(z1.call("", 3, 4)); // this == "" ==> this.a = undefined --> Nan
console.log(z1.call(x1, 3, 4));

console.log(z1.apply(x1, [1, 2, 3, 4])); // this.a = 5 + 1 + 2, rest of the values are ignored 

let z2 = z1.bind(x1, 3); 
console.log(z2(-1)); // 3 + -1 + 5
// z2 => 3 + y + this.a 

const x3 = {a: 1, inc: function() {this.a++;}};
console.log(x3);
const y2 = {__proto__: x3, b:2}; 
console.log(y2); // only 1 parameter b ==> y2 takes the values of x3 
console.log(y2.a);
y2.inc();
console.log(y2.a);

// extends the base class obect 
class Animal {
    constructor(name){
        this.name = name;
    }
    describe(){
        return `${this.name} makes a sound ${this.sound}`;
    }
}

let a = new Animal("jerry"); 
console.log(a.describe());

class Dog extends Animal{
    constructor(name){
        super(name); 
        this.sound = 'wooof';
    }
}

let d = new Dog("spike"); 
console.log(d.describe());

class Cat extends Animal{
    constructor(name){
        super(name); 
        this.sound = 'meaw';
    }
    static fromJson(o){
        c = new Cat(o.name); 
        c.sound = o.sound; 
        return c;
    }
}

let c = new Cat("tom"); 
console.log(c.describe());


let p = JSON.stringify(c);
console.log(p); // everything is string
console.log(c); // Cat and object cat

let cc = Cat.fromJson(JSON.parse(p)); // asign p to cc using the static method  
console.log(cc.describe())