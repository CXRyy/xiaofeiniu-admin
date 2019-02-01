<template>
  <div class="xfn-table-info">
    <el-card shadow="hover" class="xfn-card">
        <div class="table" :style="{backgroundColor:getTableColor(table.status)}">
          {{table.tid}}号桌：{{table.status | tableStatus}}
        </div>
        <el-button type="success" @click="showTableDetail" plain>详情</el-button>
        <el-button type="danger" @click="updateTable" plain>修改</el-button>
    </el-card>
    <el-dialog :title="table.tid+'号桌详情'" :visible.sync="dialogVisible">
      <el-tabs @tab-click="makeQRCode" v-model="activeName1" type="card">
        <el-tab-pane label="桌台状态" name="first">
          <el-form label-width="120px">
            <el-form-item label="桌台状态：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="桌台名称：">
              <el-button type="info" plain>{{table.tnmae}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="类型：">
              <el-button type="info" plain>{{table.type}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="用餐人数：">
              <el-button type="info" plain>{{table.status | tableStatus}}人</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="下单人：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="用餐时间：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==3" label="用餐菜单：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==2" label="预约人：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==2" label="联系电话：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==2" label="联系时间：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
            <el-form-item v-show="table.status==2" label="用餐时间：">
              <el-button type="info" plain>{{table.status | tableStatus}}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="桌台二维码" class="xfn-qrcode" name="second">
          <img :src="qrcodeData"></img>
          <p><el-button type="primary" palin>下载二维码</el-button></p>
          <p>提示：请将此二维码打印于对应桌台；顾客扫码即可点餐</p>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        detail:[],
        dialogVisible:false,
        activeName1:"first",
        qrcodeData:""
      } 
    },
    methods:{
      showTableDetail(){
        this.dialogVisible=true;
        if(this.table.status==2){
          this.getReservationDetail();
        }
        if(this.table.status==3){
          this.getInuseDetail();
        }
      },
      getReservationDetail(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table/reservation/"+this.table.tid;
        this.$axios.get(url).then((res)=>{
          this.detail=res.data;
          console.log(this.detail)
        }).catch((err)=>{
          console.log(err);
        })  
      },
      getInuseDetail(){
        var url=this.$store.state.globalSettings.apiUrl+"/admin/table/inuse/"+this.table.tid;
        this.$axios.get(url).then((res)=>{
          this.detail=res.data;
        }).catch((err)=>{
          console.log(err);
        })  
      },
      updateTable(){

      },
      getTableColor(num){
        return num==1?'#67C23A':num==2?'#E6A23C':num==3?'#F56C6C':'#909399'
      },
      makeQRCode(){
        var QRCode = require('qrcode')
        var tableUrl=this.$store.state.globalSettings.appUrl+"/#/"+this.table.tid
        QRCode.toDataURL(tableUrl,{width:350,errCorrectionLevel:"H"},(err,url)=>{
          this.qrcodeData=url
        })
      }
    },
    props:["table"]
  }
</script>
<style lang="scss">
  .xfn-table-info{
    padding:5px 10px;
    .xfn-card{
      text-align:center;
      .table{
        width:90%;
        height:100px;
        border:1px solid #aaa;
        box-shadow:3px 4px 5px #666;
        border-radius:50%;
        line-height:100px;
        margin:0 auto 20px;
      }
    }
    .xfn-qrcode{
      text-align:center;
      p{
        padding:5px 0;
      }
    }
  }
</style>
