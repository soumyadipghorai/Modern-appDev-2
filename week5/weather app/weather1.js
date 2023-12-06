// var appid = "SECRET_API_KEY"
Vue.component("city", {
    props: ['c'], // rather passing the name passing an object 
    data: function(){
        return{

        }
    }, 
    template: `
    <div class="card">
        <div class="card-body">
            <div class="card-title">{{c.name}}</div>
            <div class="card-text" v-if="!c.err">
                Current temp: {{c.temp}} <br>
                Min temp: {{c.temp_min}} <br>
                Max temp: {{c.temp_max}} <br>
                Last Update: {{c.lastUpdate}} <br>
            </div>
            <div class="card-text alert alert-danger" v-else>
                something went wrong : {{c.errmsg}}
            </div>
            <button class="btn btn-primary" @click="update">Update</button>
            <button class="btn btn-danger" @click="remove">Delete</button>
        </div>
    </div>
    `, 
    created() {
        Vue.set(this.c, 'temp', 'NA');
        this.c.temp_min = "NA"; 
        this.temp_max = "NA"; 
        this.c.err = false;
    }, 
    methods: {
        updateTemp(){
            if (!this.c.err){
                // console.log(this.c.weather);
                x = this.c.weather.main.temp; 
                // console.log(x); 
                Vue.set(this.c, 'temp', x? parseFloat(x-273).toFixed(1): "NA"); 
                x = this.c.weather.temp_min; 
                this.c.temp_min = x ? parseFloat(x-273).toFixed(1): "NA"; 
                // this.c.temp_min = this.c.weather.current.wind_speed_10m;
                console.log(this.c.temp_min); 
                x = this.c.weather.temp_max; 
                this.c.temp_max = x ? parseFloat(x-273).toFixed(1): "NA"; 
            }
        }, 
        async update(){
            const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
            console.log("child " + url);
            // let response = await fetch(url); 
            // let val = await response.json();
            // console.log(val.current.wind_speed_10m);
            fetch(url)
                .then((resp) => {
                    if (resp.status >= 400 && resp.status < 600){
                        this.c.err = true; 
                        this.c.errmsg = "could not retrieve data for city"; 
                        return resp; 
                    } else{
                        return resp.json();;
                    } 
                })
                .then((data) => {
                    this.c.weather = data; 
                    this.updateTemp(); 
                    this.$forceUpdate();
                })
                .catch((err) => {
                    this.c.err = true;
                    this.c.errmsg = "network error";
                })
            this.c.err = false; 
            this.c.lastUpdate = new Date().toJSON();
        }, 
        remove(){
            this.$parent.removeCity(this.c.name);
        }
    }
})


let app = new Vue({
    el : "#app", 
    data : {
        newcity : "", 
        cities : {
            chennai : {name : "chennai"}, 
            mumbai : {name: "mumbai"},
            london : {name : "london"}, 
            paris : {name: "paris"}
        }
    }, 
    methods : {
        addCity(c){
            this.cities[c] = {name: c}; 
            this.newcity = ""; 
        }, 
        removeCity(c){
            delete this.cities[c]; 
            this.$forceUpdate();
        }
    }
})