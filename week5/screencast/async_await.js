// running in sync one by one 
function say_hello(){
    return "hello";
}
console.log("before"); 
wish = say_hello()
console.log(wish); 
console.log("after");

// running in sync one by one 
async function say_hello2(){
    return "hello";
}
console.log("before"); 
wish = say_hello2()
console.log(wish); // it returns a promise 
// its a await of telling the result will be returned later 
wish.then((v) => console.log(v)); // on success we get the value. 
// response comes after `after`
console.log("after");

async function say_hello1(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("async hello");
        }, 2000); // 2sec 
    });
}

console.log("before function call"); 
wish = say_hello1()
console.log(wish); 
wish.then((v) => console.log(v)); // prints after 2sec 
console.log("at the end");

console.log("before function call"); 
wish = await say_hello1()
console.log(wish); 
console.log("at the end");

