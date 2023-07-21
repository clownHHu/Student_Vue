<template>

    <el-descriptions class="margin-top" title="个人基本信息" :column="3"  style="font-size:16px;width:85% " border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-sunset"></i>
          工号
        </template>
        {{TeaInfo.id}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        {{TeaInfo.name}}
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
        {{TeaInfo.sex}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{TeaInfo.phone}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          户籍
        </template>
        {{TeaInfo.nativeplace}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-school"></i>
          学院
        </template>
        {{TeaInfo.college}}
      </el-descriptions-item>



      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          入职时间
        </template>
        {{TeaInfo.date}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-off"></i>
          政治面貌
        </template>
        {{TeaInfo.polstatus}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          职称
        </template>
        <el-tag size="small">{{TeaInfo.remark}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-ship"></i>
          婚姻状况
        </template>
        {{TeaInfo.marriage}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        {{TeaInfo.location}}
      </el-descriptions-item>
    </el-descriptions>

</template>


<script>
var teacher;
const axios = require('axios');
var self;
import initial from '@/assets/avatar/avatar.png'
export default {
  created(){
    teacher=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.TeaInfo,'id',teacher.id);
    this.$set(this.TeaInfo,'name',teacher.name);
    this.$set(this.TeaInfo,'sex',teacher.sex);
    this.$set(this.TeaInfo,'college',teacher.college);
    this.$set(this.TeaInfo,'phone',teacher.phone);
    this.$set(this.TeaInfo,'marriage',teacher.marriage);
    this.$set(this.TeaInfo,'date',teacher.date);
    this.$set(this.TeaInfo,'nativeplace',teacher.nativeplace);
    this.$set(this.TeaInfo,'polstatus',teacher.polstatus);
    this.$set(this.TeaInfo,'location',teacher.location);
    this.$set(this.TeaInfo,'remark',teacher.title);
    self = this;
    if(teacher.avatar==null)
      this.$set(this.avatarInfo,'imageUrl',initial);
    else this.$set(this.avatarInfo,'imageUrl','http://localhost:8090/'+teacher.avatar);
  },
  data() {
    return {
      TeaInfo:{
        id:'',
        name:'',
        sex:'',
        college:'',
        marriage:'',
        phone:'',
        date:'',
        nativeplace:'',
        polstatus:'',
        remark:'',
        location:''
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