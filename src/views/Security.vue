<template>
  <div class="security">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>安全管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-card class="box-card">
      <div slot="header">
        <span>修改管理员密码</span>
      </div>
      <el-form label-width="150px">
        <el-form-item label="旧密码：">
          <el-input v-model="oldPwd" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="newPwd" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再输一次：">
          <el-input v-model="conPwd" type="password" placeholder="再输入一次"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button type="info" @click="onCancel" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        oldPwd:"",
        newPwd:"",
        conPwd:""
      }
    },
    methods:{
      onCancel(){
        this.oldPwd="";
        this.newPwd="";
        this.conPwd="";
      },
      onSubmit(){
        if(this.newPwd==this.conPwd){
          var url=this.$store.state.globalSettings.apiUrl+"/admin";
          this.$axios.patch(url,{
            oldPwd:this.oldPwd,
            newPwd:this.newPwd,
            aname:this.$store.state.adminName
          })
          .then((res)=>{
            if(res.data.code==200){
              this.$message({
                showClose: true,
                type: 'success',
                message: '密码修改成功！'
              });
            }else if(res.data.code==400){
              this.$message({
                showClose: true,
                type: 'error',
                message: '密码错误！'
              });
            }else if(res.data.code==401){
              this.$message({
                showClose: true,
                type: 'info',
                message: '新旧密码相同！'
              });
            }
          })
          .catch((err)=>{
            console.log(err);
          })
        }else{
          this.$message({
            showClose: true,
            type: 'error',
            message: '输入信息有误！'
          });
        }
      }
    }
  }
</script>
<style lang="scss">
  .box-card{
    width:1000px;
  }
</style>
