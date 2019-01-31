<template>
  <div class="settings">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="xfn-card" shadow="never">
      <el-form label-width="150px">
        <el-form-item label="应用名称：">
          <el-input v-model="appName"></el-input>
        </el-form-item>
        <el-form-item label="应用API网址：">
          <el-input v-model="apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="后台管理端网址：">
          <el-input v-model="addminUrl"></el-input>
        </el-form-item>
        <el-form-item label="客户端App网址：">
          <el-input v-model="appUrl"></el-input>
        </el-form-item>
        <el-form-item label="ICP备案号：">
          <el-input v-model="icp"></el-input>
        </el-form-item>
        <el-form-item label="版权声明：">
          <el-input v-model="copyright"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card> 
  </div>
</template>
<script>
  export default {
    data(){
      return {
        sid:0,
        appName:"",
        apiUrl:"",
        addminUrl:"",
        appUrl:"",
        icp:"",
        copyright:""
      }
    },
    mounted(){
      this.getFormData();
    },
    methods:{
      onSubmit(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/settings";
        var data={
          sid:this.sid,
          appName:this.appName,
          apiUrl:this.apiUrl,
          addminUrl:this.addminUrl,
          appUrl:this.appUrl,
          icp:this.icp,
          copyright:this.copyright
        }
        this.$axios.put(url,data)
        .then((res)=>{
          if(res.data.code==200){
            this.$message({
              showClose: true,
              message: '信息修改成功！'
            });
            this.$store.state.globalSettings=data;
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      onCancel(){
        this.getFormData();
      },
      getFormData(){
        this.sid=this.$store.state.globalSettings.sid;
        this.appName=this.$store.state.globalSettings.appName;
        this.apiUrl=this.$store.state.globalSettings.apiUrl;
        this.addminUrl=this.$store.state.globalSettings.addminUrl;
        this.appUrl=this.$store.state.globalSettings.appUrl;
        this.icp=this.$store.state.globalSettings.icp;
        this.copyright=this.$store.state.globalSettings.copyright;
      }
    }
  }
</script>
<style lang="scss">
  .xfn-card{
    margin-top:20px;
  }
</style>
