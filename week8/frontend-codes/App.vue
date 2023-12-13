
import HelloWorld from './components/HelloWorld.vue';
<template>
    <div id="app">
        <img src="./assets/logo.png" alt="">
        <HelloWorld></HelloWorld>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
    name : "App", 
    components : {
        HelloWorld
    }
}
</script>

<style>
#app{
    font-family: 'Courier New', Courier, monospace;
}

</style>