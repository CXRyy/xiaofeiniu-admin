<template>
  <div class="xfn-table-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="table of tableList">
        <xfu-table :table="table"></xfu-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Table from "../components/Table"
  export default {
    data(){
      return {
        tableList:[]
      }
    },
    methods:{
      getList(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table";
        this.$axios.get(url).then((res)=>{
          this.tableList=res.data;
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted(){
      this.getList();
    },
    components:{
      "xfu-table":Table
    }
  }
</script>
<style lang="scss">
  
</style>
