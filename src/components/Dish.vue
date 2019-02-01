<template>
  <div class="xfn-dish">
    <img :src="require('../assets/img/dish/'+dish.imgUrl)" alt="" style="max-width:100%"> 
    <h3>{{dish.title}}</h3>     
  </div>
</template>
<script>
  export default {
    methods:{
      
    },
    props:["dish"]
  }
</script>
<style lang="scss">
  
  
</style>
