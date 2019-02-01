<template>
  <div class="xfn-add-dish">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-form label-width="100px">
      <el-form-item label="菜品图片：">
        <el-upload class="avatar-uploader" name="dishImg" :action="uploadAction" :show-file-list="false"
        :on-success="handleSuccess"> 
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="主标题：">
        <el-input v-model="formData.title" placeholder="请输入菜品主标题"></el-input>
      </el-form-item>
      <el-form-item label="所属类别：">
        <div>
          <el-radio v-for="c of categoryList" v-model="formData.categoryId" :label="c.cid" border>{{c.cname}}</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="价格：">
        <el-input v-model="formData.price" placeholder="请输入菜品价格"></el-input>
      </el-form-item>
      <el-form-item label="菜品描述：">
        <el-input v-model="formData.detail" type="textarea" placeholder="请输入菜品描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="info" plain @click="onReset">重填</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        uploadAction:this.$store.state.globalSettings.apiUrl+"/admin/dish/image",
        imageUrl:"",
        formData:{
          title:"",
          imgUrl:"",
          price:"",
          detail:"",
          categoryId:1
        },
        categoryList:[]
      }
    },
    methods:{
      handleSuccess(res,file){
        this.imageUrl=URL.createObjectURL(file.raw);
        this.formData.imgUrl=res.fileName;
      },
      onSubmit(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/dish";
        this.$axios.post(url,this.formData)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      onReset(){
        this.imageUrl=""
        this.formData.title="";
        this.formData.imgUrl="";
        this.formData.price="";
        this.formData.detail="";
        this.formData.categoryId="";
      },
      getCategory(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
        this.$axios.get(url)
        .then((res)=>{
          this.categoryList=res.data;
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted(){
      this.getCategory();
    }
  }
</script>
<style lang="scss">
  .avatar-uploader{
    .el-upload {
      border:1px dashed #d9d9d9;
      border-radius:6px;
      cursor:pointer;
      position:relative;
      overflow:hidden;
      &:hover {
        border-color:#409EFF;
      }
    }
    .avatar-uploader-icon {
      font-size:28px;
      color:#8c939d;
      width:178px;
      height:178px;
      line-height:178px;
      text-align:center;
    }
    .avatar {
      width:178px;
      height:178px;
      display:block;
    }
  } 
  
</style>
