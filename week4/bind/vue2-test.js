Vue.component('my-card', {
    props : ['title', 'size', 'goto'],  // component has 2 properties 
    data : function(){
        return {

        }
    }, 
    computed : {
        imglink : function(){
            /*
            * if this.size is null then x = 100 
            * else x = this.size 
            */
            let x = this.size ??= 100; 
            return "https://via.placeholder.com/" + x; 
        }
    }, 
    template : `
    <div class="card col-sm m-2" style="width: 18rem;">
        <img :src="imglink" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <slot></slot>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a :href="goto" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `
    /*
    * :src is for binding 
    * text inside my card component in html will go inside slot 
    * * title will from property
    */
})

let app = new Vue({
    el : "#app", // connect with the app
})