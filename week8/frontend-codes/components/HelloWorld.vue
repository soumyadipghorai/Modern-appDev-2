<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name : 'HelloWorld', 
    data() {
        return {
            msg : 'HW'
        }
    }, 
    mmounted : function(){
        // backend hosted in a different port 
        fetch("http://localhost:8080/api/test")
        .then(response => response.json())
        .then(data => {
            this.msg = data["msg"];
        });
    }
}
</script>

<style>
h3{
    font-size: large;
}
</style>