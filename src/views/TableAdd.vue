<template>
  <div class="xfn-table-delete">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加桌台</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-form label-width="100px">
      <el-form-item label="桌台别名：">
        <el-input v-model="formData.tname" placeholder="给桌台取个吉利喜庆的名字吧"></el-input>
      </el-form-item>
      <el-form-item label="桌台类型：">
        <el-input v-model="formData.type" placeholder="这是几人桌呢？如8人桌、3-4人桌..."></el-input>
      </el-form-item>
      <el-form-item label="初始状态：">
        <div style="margin-top: 20px">
          <el-radio v-model="formData.status" label="1" border>空闲</el-radio>
          <el-radio v-model="formData.status" label="2" border disabled>预定</el-radio>
          <el-radio v-model="formData.status" label="3" border disabled>占用</el-radio>
          <el-radio v-model="formData.status" label="4" border disabled>其它</el-radio>
        </div>
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
        formData:{
          tname:"",
          type:"",
          status:"1"
        }
      }
    },
    methods:{
      onSubmit(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table";
        this.$axios.post(url,this.formData)
        .then(({data})=>{
          if(data.code==200){
            this.$message({
              showClose: true,
              type: 'success',
              message: data.tid+'号桌台添加成功！'
            });
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>
<style lang="scss">
  
</style>

