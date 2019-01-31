<template>
  <div class="login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="管理员名：">
            <el-input type="text" v-model="formData.aname" placeholder="请输入管理员名"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：">
            <el-input type="password" v-model="formData.apwd" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">登录</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        formData:{
          aname:"dd",
          apwd:"123456"
        }
      } 
    },
    methods:{
      doLogin(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/login/"+this.formData.aname+"/"+this.formData.apwd;
        this.$axios.get(url).then((res)=>{
          if(res.data.code==200){
            this.$router.push("/main");
            this.$store.commit("setAdminName",this.formData.aname);
          }else{
            this.$alert('用户名或密码有误！', '登录失败', {
              confirmButtonText: '确定',
              type:"error"
            }).then(()=>{}).catch(()=>{});
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      doCancel(){
        this.formData.aname="";
        this.formData.apwd="";
      },
      getGlobalSettings(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/settings";
        this.$axios.get(url).then((res)=>{
          this.$store.commit("setGlobalSettings",res.data);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.getGlobalSettings();
    }
  }
</script>
<style lang="scss">
  .xfn-login-card{
    width:450px;
    margin:150px auto;
    .el-card__header{
      text-align:center;font-size:1.2em;
    }
  }
</style>
