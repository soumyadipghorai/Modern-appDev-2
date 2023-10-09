let x = [1, 2, 3]; 
console.log(`${typeof(x)} : ${x} with length = ${x.length}`); // object type 
console.log(x[0]); // 0 indexing 

let y = [1, 'b', a => a + 1]; // takes an input a and makes it a + 1
console.log(`${typeof(y)} : ${y} with length = ${y.length}`);
console.log(x.length, y.length);

x = []; 
console.log(`${typeof(x)} : ${x} with length = ${x.length}`); // object type 
console.log(x[0]); // 0 indexing 

y.length = 10; // adds undefined values at the end 
console.log(`${typeof(y)} : ${y} with length = ${y.length}`);

// as we are incrementing i so i can't be const 
for (let i = 0; i < y.length; i++){
    console.log(`x: ${y[i]} of type ${typeof(y[i])}}`);
}

// it skips the undefined values, iterator function  
for (const i in y){
    console.log(`x: ${y[i]} of type ${typeof(y[i])}}`);
}

/*
* here we don't need to y[i] and it doesn't skip the undefined
* similar to python for val in num 
*/
for (const i of y){
    console.log(`x: ${i} of type ${typeof(i)}}`);
}

/*
object are not directly iterable
there are methods to implement iteration 
*/

let map = {'a' : 1, 'b' : 'alpha', 'c' : [3, 2, 1]}; // object
console.log(typeof(map));
// this iterates over the keys of map 
for (const i in map){
    console.log(`key: ${i} value : ${map[i]} type : ${typeof(map[i])}}`);
}

/*
this will give error and map is not iterable as its supposed to iterate directly over the values of map
for (const i of map){
    console.log(`key: ${i} type : ${typeof(i)}}`);
}
*/

for (const [key, value] of Object.entries(map)){
    console.log(key, value);
}

let x1 = new Array(5); // 5 empty items 
console.log(x1);

x1[1] = 10; 
x1[3] = "hello"; 

// use [] for key, value 
for (const [key, value] of x1.entries()){
    console.log(`index ${key}, value ${value} of type ${typeof(value)}`);
}

// skips the undefined ones 
for (const val in x1){
    console.log(`${val} of type ${typeof(val)}`);
}

// ? spreading 
let x2 = [1, 2, 3, 4]
let y1 = [0, ...x2, 5] //...x2 inserts all the values of x2 in y1 
console.log(x2); 
console.log(y1);

// finds the 1st element in y1 where the value > 3. 
// similar to pandas lambda x : x > 3
let val = y1.find(x => x > 3); 
console.log(val);

console.log(y1.filter(t => t > 3), typeof(y1.filter(t => t > 3))); // filter return array of all the values > 3

// if the value > 3 replace it by + else -
console.log(y1.map(i => i > 3 ? "+" : '-'));

// y1.reduce(function, initial_value )
// function(a = initial_value, i = element_of_y1)
// return a + i 

let y2 = [1, -2, 3, 4, -3, -11];
console.log(y2.reduce((a, i) => a+i, 0)); // sum of all elements in array 
console.log(y2.reduce((a, i) => a*i, 1)); // product of all elements in array 

// string based sort 
// ==> positive numbers are sorted in ascending order 
// ==> negative numbers are not sorted 
console.log(y2.sort()); 

// function(a, b) => a - b 
// if a-b < 0 => b>a
// if a-b > 0 => a>b
// if a-b = 0 => b==a
console.log(y2.sort((a, b) => a-b)); // proper sort 

let x3 = [1, 2, 3]; 
let [a, b] = x3; // a, b = [1, 2] ==> a = 1, b = 2
console.log(x3, a, b);

const person = {
    firstName : "albert", 
    lastName: 'pinto', 
    age : 25, 
    city : 'mumbai'
}; 

console.log(person);

// takes firstName and save it in fn 
const {firstName: fn, city: c} = person;
console.log(fn, c, person);

const {lastName, age} = person;
console.log(lastName, age, person);

// rem contains everything else except firstName
const {firstName, ...rem} = person; 
console.log(firstName, rem, person);