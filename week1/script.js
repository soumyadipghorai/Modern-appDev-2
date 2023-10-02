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