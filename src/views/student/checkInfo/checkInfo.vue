<template>

    <el-descriptions class="margin-top" title="个人基本信息" :column="3"  style="font-size:16px;width:85% " border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-sunset"></i>
          学号
        </template>
        {{StuInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        {{StuInfo.name}}
      </el-descriptions-item>
      <el-descriptions-item >
        <template slot="label">
          <i class="el-icon-picture-outline-round"></i>
          证件照
        </template>
        <div class="demo-image" style="margin: auto">
          <img :src="avatarInfo.imageUrl" class="avatar">
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-male"></i>
          性别
        </template>
        {{StuInfo.sex}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{StuInfo.phone}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          生源地
        </template>
        {{StuInfo.nativeplace}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-school"></i>
          学院
        </template>
        {{StuInfo.college}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-guide"></i>
          班级
        </template>
        {{StuInfo.classn}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-reading"></i>
          专业
        </template>
        {{StuInfo.major}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          入学时间
        </template>
        {{StuInfo.date}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-off"></i>
          政治面貌
        </template>
        {{StuInfo.polstatus}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">{{StuInfo.remark}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-ship"></i>
          身份证号
        </template>
        {{StuInfo.idnumber}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        {{StuInfo.location}}
      </el-descriptions-item>
    </el-descriptions>

</template>


<script>
var stu;
const axios = require('axios');
var self;
import initial from '@/assets/avatar/avatar.png'
export default {
  created(){
    stu=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.StuInfo,'id',stu.id);
    this.$set(this.StuInfo,'name',stu.name);
    this.$set(this.StuInfo,'sex',stu.sex);
    this.$set(this.StuInfo,'college',stu.college);
    this.$set(this.StuInfo,'classn',stu.classn);
    this.$set(this.StuInfo,'phone',stu.phone);
    this.$set(this.StuInfo,'major',stu.major);
    this.$set(this.StuInfo,'idnumber',stu.idnumber);
    this.$set(this.StuInfo,'date',stu.date);
    this.$set(this.StuInfo,'nativeplace',stu.nativeplace);
    this.$set(this.StuInfo,'polstatus',stu.polstatus);
    this.$set(this.StuInfo,'location',stu.location);
    this.$set(this.StuInfo,'remark',stu.remark);
    self = this;
    if(stu.avatar==null)
      this.$set(this.avatarInfo,'imageUrl',initial);
    else this.$set(this.avatarInfo,'imageUrl','http://localhost:8090/'+stu.avatar);
  },
  data() {
    return {
      StuInfo:{
        id:'',
        name:'',
        sex:'',
        college:'',
        classn:'',
        phone:'',
        major:'',
        idnumber:'',
        date:'',
        nativeplace:'',
        polstatus:'',
        location:'',
        remark:''
      },
      avatarInfo:{
        imageUrl: ''
      },
    };
  },
  methods: {

  }
}
</script>

<style>
.input{
  width: 70px;
  height: 100%;
  /*opacity: 0;*/
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>