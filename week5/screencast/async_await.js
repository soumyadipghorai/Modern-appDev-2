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

async function say_hello1(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("async hello");
        }, 2000); // 2sec 
    });
}

async function say_hello3(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            reject("async hello");
        }, 2000); // 2sec 
    });
}

wish = say_hello3(); 
console.log(wish); 
// it will give an error as its rejected 
// to handle this we do the following 

say_hello3()
.then((v) => console.log(v))
.catch(e => {
    console.log("Got error"); 
    console.log(e);
})

async function greetings(){
    console.log("before"); 
    wish = await say_hello1(); 
    // this will give an error as await can only be used 
    // in async function to make this work we have to make it a async function
    console.log(wish); 
    console.log("after");
    return wish;
}

greetings();

async function greetings2(){
    console.log("before"); 
    try{
        wish = await say_hello3()
        console.log(wish)
        console.log(after)
        return wish
    }catch(e){
        console.log("got error")
        console.log(e)
        return null
    }
}

x = greetings2();

// or we can do the following 
x.then((v) => console.log(v))
.catch(e => {
    console.log("got error")
    console.log(e)
})