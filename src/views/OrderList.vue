<template>
  <div class="orderList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br/>
    <br/>
    <el-table :data="orderList" stripe border style="width: 100%">
      <el-table-column prop="oid" label="订单编号">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
      </el-table-column>
      <el-table-column prop="customerCount" label="用餐人数">
      </el-table-column>
      <el-table-column prop="tabled" label="桌台编号">
      </el-table-column>
      <el-table-column prop="detail" label="菜品详情">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        orderList:[]
      }
    },
    methods:{
      getOrder(){

      }
    }
  }
</script>
<style lang="scss">
  
</style>

