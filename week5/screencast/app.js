// component has name, set of attributes 
Vue.component("message-board", {
    props : ['title'], 
    template : `
    <div>
        <h3>{{title}}</h3>
        <div class="form-group">
            <label for="visitor_name">Your Name</label>
            <input type="text" id="visitor_name" v-model="visitor_name">
        </div>
        <div class="form-group">
            <label for="visitor_message">Your message</label>
            <input type="text" id="visitor_message" v-model="visitor_message">
        </div>
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
        }
    },
    computed : {
        count : function(){
            return this.messages.length;
        }
    }, 
    beforeCreate : function(){
        console.log("component before create");
    }, 
    created : function(){
        // ! fetch data here as well 
        console.log("component after create");
    }, 
    beforeMount : function(){
        console.log("component mount");
    },
    mounted : function(){
        // ? fetch data from backend 
        console.log("component mounted");
        console.log(this.$el); // main app element 
    },
    beforeUpdate : function(){
        console.log("component before update");
    },
    updated : function(){
        // data updated 
        console.log("component updated"); 
    },
    beforeDestroy : function(){
        console.log("component before destroy");
    },
    destroyed : function(){
        // turn of event listeners 
        console.log("component destroyed"); 
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
        }
    }, 
    beforeCreate : function(){
        console.log("app before create");
        console.log(this.global_count); // will give undefined cause this before create
    }, 
    created : function(){
        // ! fetch data here as well 
        console.log("app after create");
        console.log(this.global_count); // will give the data 
    }, 
    beforeMount : function(){
        console.log("app mount");
    },
    mounted : function(){
        // ? fetch data from backend 
        console.log("app mounted");
        console.log(this.$el); // main app element 
    },
    beforeUpdate : function(){
        console.log("app before update");
    },
    updated : function(){
        // data updated 
        console.log("app updated"); 
    },
    beforeDestroy : function(){
        console.log("app before destroy");
    },
    destroyed : function(){
        // turn of event listeners 
        console.log("app destroyed"); 
    }
})