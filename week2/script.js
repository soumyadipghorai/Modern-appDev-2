console.log('hello console!');

// one line comments 
/* 
* multi line
* comment
*/

let x = 0; 
const anotherVariable = 42; 
var we_dont_use_var = true; 
let साल = '২০১৮'; // allowed 
console.log(साल);

// scope 
var x1 = 10; 
{
    console.log(x1);
    var x2 = 20;
}
console.log(x2); // can be visible 

/*
let x3 = 10; 
{
    console.log(x3);
    let x4 = 20;
}
console.log(x4); // not visible 

const x5 = 10; 
{
    console.log(x3);
    const x6 = 20;
}
console.log(x4); // same as let  
*/

let s = "hello"; 
console.log(s); 
console.log(s.length); 
console.log(s[1]); 
console.log(s.substring(2, 4)); 

// template 
let st = `${s} world`; 
console.log(st); 
console.log(`length of ${साल} = ${साल.length}`)

// operators 
console.log(3 + 4); 
console.log('3' + '4'); // concatinate 
console.log('3' + 4); // converts both to string and concatinate 
console.log(3 + '4'); 
console.log('3' * '4'); // converts both into numbers and multiply

console.log(3 == 4); // false 
console.log(3 == 3); // true 
console.log('3' == 3); // true 
console.log('3' === 3); // false 
console.log(undefined == null); // true 
console.log(undefined === null); // false 
console.log("========================="); 

/* 
* undefine --> implies not initialized, default unknown state
* nul --> explicitly set a non-value 
*/
let x3 = 5; 
if (x3 == 5){
    console.log('5');
}
else {
    console.log('!5');
}

// here const can't be used as you're doing x++
for (let x = 0; x < 5; x++){
    console.log(x);
}

// but here const can be used as 
// within the scope of this loop the value is not changing
const arr = [1, 2, 3, 4]
for (const x in arr){
    console.log('index --> ', x); // print the index values 
    console.log('value --> ', arr[x]); // prints the arr values 
}

for (const x of arr){
    console.log('value --> ', x); // prints the arr values 
}

// regular declaration 
function add(x, y){
    return x + y;
}
console.log(typeof(add));
console.log(add(2, 3));
add.V = {'a' : 3, 'b' : 6}; // object of the function 
console.log(add.V);
console.log(add.V.a);
console.log(typeof(add.V));

// named expression 
let add1 = function(x, y){
    return x + y;
}
console.log(typeof(add1));
console.log(add1(3, 4));

// arrow function 
let add2 = (x,y) => x + y;
console.log(typeof(add2));
console.log(add2(4, 5));

// ! IIFEs 
// anonymous bound 
let x4 = function(){
    return "hello";
}

// declare and invoke --> can't be reused 
(function() {return "hello"}());
console.log(function (x, y) {return x+y}(100, 101));