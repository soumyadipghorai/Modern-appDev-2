<template>
    <p>{{greeting}} world</p>
<template>

<script>
    module.exports ={
        data : function(){
            return {
                greeting : "hello"
            }
        }
    }
</script>

<style scoped>
    -p{
        font-size: 2rem; 
        text-align : center
    }
</style>