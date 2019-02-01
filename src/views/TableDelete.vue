<template>
  <div class="xfn-table-delete">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>删除桌台</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-form label-width="100px">
      <el-form-item label="桌台编号：">
        <el-input v-model="tid" placeholder="请输入要删除的桌台编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        tid:""
      }
    },
    methods:{
      onSubmit(){
        this.$confirm('此操作将永久删除该桌台, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          var url=this.$store.state.globalSettings.apiUrl+"/admin/table/"+this.tid;
          this.$axios.delete(url)
          .then(({data})=>{
            if(data.code==200){
              this.$message({
                showClose: true,
                type: 'success',
                message: '桌台删除成功！'
              });
            }else if(data.code==400){
              this.$message({
                showClose: true,
                type: 'warning',
                message: '桌台不存在！'
              });
            }else if(data.code==401){
              this.$message({
                showClose: true,
                type: 'warning',
                message: '桌台正在使用，无法删除！'
              });
            }
          })
          .catch((err)=>{
            console.log(err);
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      }
    }
  }
</script>
<style lang="scss">
  
</style>
