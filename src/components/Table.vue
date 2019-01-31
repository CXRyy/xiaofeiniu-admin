<template>
  <div class="xfn-table-info">
    <el-card shadow="hover" class="xfn-card">
        <div class="table" :style="{backgroundColor:table.status==1?'rgb(103, 194, 58)':table.status==2?'rgb(230, 162, 60)':table.status==3?'rgb(245, 108, 108)':'rgb(144, 147, 153)'}">
          {{table.tid}}号桌：{{table.status | tableStatus}}
        </div>
        <el-button type="success" @click="getDetail(table)" plain>详情</el-button>
        <el-button type="danger" @click="updateTable" plain>修改</el-button>
    </el-card>
    <el-dialog :title="table.tid+'号桌详情'" :visible.sync="dialogVisible1">
      <el-tabs v-model="activeName1" type="card">
        <el-tab-pane label="桌台状态" name="first">
          桌台状态：<el-button type="info" plain>{{table.status | tableStatus}}</el-button>
        </el-tab-pane>
        <el-tab-pane label="桌台二维码" name="second">二维码</el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        detail:[],
        dialogVisible1:false,
        activeName1:"first"
      } 
    },
    methods:{
      quit(){
        this.$store.commit("setAdminName","");
        this.$router.push("/login");
      },
      getDetail(table){
        if(this.table.status==1){
            this.dialogVisible1=true;
        }
        if(this.table.status==2){
          this.getReservationDetail(table.tid);
        }
        if(this.table.status==3){
          this.getInuseDetail(table.tid);
        }
      },
      getReservationDetail(tid){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table/reservation/"+tid;
        this.$axios.get(url).then((res)=>{
          this.detail=res.data;
          console.log(this.detail)
        }).catch((err)=>{
          console.log(err);
        })  
      },
      getInuseDetail(tid){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table/inuse/"+tid;
        this.$axios.get(url).then((res)=>{
          this.detail=res.data;
        }).catch((err)=>{
          console.log(err);
        })  
      },
      updateTable(){

      }
    },
    props:["table"]
  }
</script>
<style lang="scss">
  .xfn-table-info{
    .xfn-card{
      height:200px;
      text-align:center;
      .table{
        width:80%;
        height:100px;
        border-radius:50%;
        line-height:100px;
        margin:0 auto 10px;
        }
      }
  }
</style>
