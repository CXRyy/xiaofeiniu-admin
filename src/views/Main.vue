<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
      
      </el-aside>
      <el-container>
        <el-header height="60px">

        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    beforeCreate() {
      if(!this.$store.state.adminName){
          this.$router.push("/login");
      }
    }
  }
</script>
<style lang="scss">
  
</style>
