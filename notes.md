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

### What's frontend
* user facing part of app 
* requirements 
    * avoid complex logic 
    * no data storage 
    * work with stateless nature of HTTP
* desirable 
    * aesthetically pleasing 
    * responsive 
    * adaptive 

#### Programming style :
* **imperative** : sequence of actions to achieve final result 
* **declarative** : specify desired result 

### Reactivity 
* auto-update in response to changes in data 
* binding between model(data) and view(display)

How? 
* server tracks state --> user logged in? date/time 
* server responds with complete HTML based on present state --> fully server side 
* client-JS --> login controller retrieves user model 

Vue-directives 
* v-bind --> one way binding - update variable, relects on display 
* v-on --> event binding 

class binding 
* dynamically modify class of an element 
* special support for bind-object 
* multiple classes attached based on key-value 

conditional rendering 
* v-if="argument" --> following is shown when the condition is true 
* v-show="param" --> only if show parameter evaluates true, always rendered and present in DOM - only CSS display parameter changed 

looping 
* v-for="item in items"
* v-for="value in obj"
* v-for="(value, name) in obj"
* v-for="(value, name, index) in obj"

loop keys
* for complex loops to keep track of the element created from the for loop we use a key. key must be unique for each loop element 

### Model / View 
* Model 

* View 