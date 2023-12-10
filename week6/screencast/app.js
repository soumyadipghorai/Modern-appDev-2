const privacyPolicy = Vue.component("privacy-policy", {
    template : `    
    <div>
        <h3>Privacy policy</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, accusantium.</p>
    </div>
    `
})
const about = Vue.component("about", {
    template : `    
    <div>
        <h3>about</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, accusantium.</p>
    </div>
    `
})
const messageBoard = Vue.component("message-board", {
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
        <i class="bi bi-cloud-arrow-up-fill" v-bind:class="savedIconClass"></i>
        <ul>
            <li v-for = "message in messages">{{message["visitor_name"]}} : {{message["visitor_message"]}}</li>
        </ul>
    </div>
    `,
    data: function(){
        return {
            visitor_name : null, 
            visitor_message : null,
            savedIconClass : "text-success",
            messages: [],
        } 
    }, 
    methods : {
        sayHi : function(){
            this.messages.push({
                "visitor_name" : this.visitor_name, 
                "visitor_message" : this.visitor_message
            }); 
            this.savedIconClass = "text-warning"; 
            fetch("https://httpbin.org/post", {
                method: 'POST', 
                headers : {
                    "Content-Type" : 'application/json',
                }, 
                body: JSON.stringify({
                    "for": this.title, "visitor_name" : this.visitor_name, "visitor_message" : this.visitor_message
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Success: ", data); 
                this.savedIconClass = "text-success";
            })
            .catch((error) => {
                console.log("Error: ", error);
                this.savedIconClass = "text-danger"
            })


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
    mounted : async function(){
        response = await fetch("http://localhost:8000/messages.json")
        data = await response.json()
        this.messages = data 
    }
})

// ? routes 
const routes = [{
    path : '/', 
    component : messageBoard, 
    props : {title : "ghorai"}, 
}, 
{
    path : '/about', 
    component : about
}, 
{
    path: '/privacy', 
    component : privacyPolicy
}]; 

// added routes
const router = new VueRouter({
    routes 
})

var app = new Vue({
    el: "#app", 
    router : router,
    data : {
        grand_total : 0
    },
    methods : {
        count_global : function(){
            this.grand_total = this.grand_total + 1;
            console.log('hit', this.grand_total);
        }
    }
})