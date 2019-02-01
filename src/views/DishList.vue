<template>
  <div class="xfn-dish-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(c,i) of dishList" :label="c.cname">
        <span slot="label">
          <el-badge :value="c.dishList.length">
            {{c.cname}}
          </el-badge>
        </span>
        <el-row>
          <el-col :xs="12" :md="6" :lg="4" :xl="3" v-for="(d,j) of c.dishList">
            <dish :dish="d"></dish>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Dish from "../components/Dish"
  export default {
    data(){
      return {
        dishList:[]
      }
    },
    methods:{
      getDish(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/dish";
        this.$axios.get(url)
        .then(({data})=>{
          this.dishList=data;
          console.log(this.dishList)
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted(){
      this.getDish();
    },
    components:{
      Dish
    }
  }
</script>
<style lang="scss">
  
</style>
