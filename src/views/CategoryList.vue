<template>
  <div class="category">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <el-button class="xfn-add-btn" type="primary" @click="addCategory">+添加新的菜品类别</el-button>
    <br/>
    <br/>
    <el-table :data="categoryList" stripe border style="width: 100%">
      <el-table-column prop="cid" label="编号">
      </el-table-column>
      <el-table-column prop="cname" label="名称">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="small" @click="updateCategory(row,$index)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteCategory(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        categoryList:[]
      }
    },
    methods:{
      getCategory(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
        this.$axios.get(url)
        .then((res)=>{
          this.categoryList=res.data;
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      deleteCategory(c,i){
        this.$confirm('此操作将永久删除该菜品类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          var url=this.$store.state.globalSettings.apiUrl+"/admin/category/"+c.cid;
          this.$axios.delete(url)
          .then((res)=>{
            if(res.data.code==200){
              this.categoryList.splice(i,1);
              this.$message({
                showClose: true,
                type: 'success',
                message: '菜品类别删除成功！'
              });
            }else{
              this.$message.error('菜品类别删除失败！');
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
      },
      updateCategory(c,i){
        this.$prompt('请输入新的菜品类别名称：', '修改菜品类别', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: c.cname
        }).then(({ value }) => {
          var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
          this.$axios.put(url,{cid:c.cid,cname:value})
          .then((res)=>{
            if(res.data.code==200){
            this.categoryList[i].cname=value;
              this.$message({
                showClose: true,
                type: 'success',
                message: '菜品类别更新成功！'
              });
            }
          })
          .catch((err)=>{
            console.log(err);
          }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      addCategory(){
        this.$prompt('请输入新菜品类别的名称：', '添加菜品类别', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder:"新菜品类别类别名"
        }).then(({ value }) => {  
          var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
          this.$axios.post(url,{cname:value})
          .then((res)=>{
            if(res.data.code==200){
              this.categoryList.push({cid:res.data.cid,cname:value});
              this.$message({
                showClose: true,
                message: '菜品类别添加成功！',
                type: 'success'
              });
            }else{
              this.$message.error('菜品类别添加失败！');
            }
          })
          .catch((err)=>{
            console.log(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    },
    mounted(){
      this.getCategory();
    }
  }
</script>
<style lang="scss">
  
</style>
