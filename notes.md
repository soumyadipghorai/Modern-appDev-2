ECMA - standard 262 <br>
polyfills: include libraries that emulate newer functionality for older browser

* reserved words : await, break, if, while...
* literals : true, false, null 
* others to avoid : implements, package, interface, private, public...

### statement : 
```js 
if (){
    // do something
}
```
### expression : 
```js 
x = 10; 
```

* Basic Arrays : same as python list. can contain mixed types
* Maps : proper dictionaries instead of objects
* WeekMaps 
* Sets

**Callback:** function passed in to another function, to be called back for some purpose 

Generators -> functions that `yield` values one at a time 

npm -> Node Package Manager 

#### Object 
* object can have a "prototype" 
* automatically get properties of parent, single inheritance track 

**run-to-completion** --> once a task goes inside the call stack the task has to complete before fetching another task 

**callback** --> push long running code into a seperate thread or task, let main code proceed, call back when completed 

```js
// synchronous 
const fs = require('fs'); 

try{
    const data = fs.readFileSync('/Users/joe/test.txt', 'utf-8');
    console.log(data)
}catch (err) {
    console.error(err)
}
```

```js
// asynchronous 
const fs = require('fs'); 

fs.readFileSync('/Users/joe/test.txt', 'utf-8', (err, data) => {
    if (err){
        console.error(err);
        return;
    }
    console.log(data)
});
```

JSON : java script object notation
```js
JSON.stringify()
JSON.parse()
```