/*
// normal js way of doing 
let message = "hello world";
document.getElementById("app").innerHTML = message;
*/

// vue js 
var app = new Vue({
    el: "#app",  
    data: { 
        message : "Hello World", 
        // count : 0, 
        visitor_name : "", 
        visitors: [ ]
    }, 
    methods : {
        sayHi : function(){
            this.message = "Hi";
            // this.count = this.count + 1;
            this.visitors.push(this.visitor_name); 
            this.visitor_name = "";
        }
    },
    computed : {
        count : function(){
            return this.visitors.length;
        }
    }
})