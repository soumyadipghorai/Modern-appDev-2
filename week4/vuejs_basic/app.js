// component has name, set of attributes 
Vue.component("message-board", {
    // property is defined below and passed into the message board 
    props : ['title'], 
    template : `
    <div>
        <h3>{{title}}</h3>
        <p>Your Name: <input type="text" v-model = "visitor_name"></p>
        <p>Your message: <input type="text" v-model = "visitor_message"></p>
        <button v-on:click = "sayHi">Say Hi</button>
        <ul>
            <li v-for = "message in messages">{{message["visitor_name"]}} : {{message["visitor_message"]}}</li>
        </ul>
    </div>
    `,
    data: function(){
        return {
            visitor_name : "", 
            visitor_message : "",
            messages: [ ]
        } 
    }, 
    methods : {
        sayHi : function(){
            this.messages.push({
                "visitor_name" : this.visitor_name, 
                "visitor_message" : this.visitor_message
            }); 
            this.visitor_name = "";
            this.visitor_message = "";
            this.$emit("add-to-global-total");
            // this.global_count += 1; 
            // can't access the global variable like this 
            // for this we have to emmit an event
        }
    },
    computed : {
        count : function(){
            return this.messages.length;
        }
    }
})

var app = new Vue({
    el: "#app", 
    data : {
        global_count : 0
    },
    methods : {
        count_global : function(){
            this.global_count = this.global_count + 1;
            console.log('hit', this.global_count);
        }
    }
})