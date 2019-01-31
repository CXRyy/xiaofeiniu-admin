<template>
  <div class="xfn-main-header">
    <h3 class="xfn-title">{{this.$store.state.globalSettings.appName}}</h3>
    <div class="xfn-right">
      当前用户：{{this.$store.state.adminName}}
      <el-button @click="quit">退出</el-button>
    </div>        
  </div>
</template>
<script>
  export default {
    methods:{
      quit(){
        this.$store.commit("setAdminName","");
        this.$router.push("/login");
      }
    }
  }
</script>
<style lang="scss">
  $header-height:60px;
  .xfn-main-header{
    background:#DCDFE6;
    border-radius:4px;
    line-height:$header-height;
    height:$header-height;
    padding:0 20px;
    color:#909399;
    .xfn-right{
        float:right;
    }
    .xfn-title{
        float:left;
        margin:0;
    }
  }
</style>
