<template>

  <el-descriptions class="margin-top" title="个人基本信息" :column="3"  style="font-size:16px;width:85% " border>
    <template slot="extra">
      <el-button type="primary" @click="saveInfo">保存</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-sunset"></i>
        工号
      </template>
      <el-input v-model="TeaInfo.id" style="width: 150px;" placeholder="请输入" :disabled="true"></el-input>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        姓名
      </template>
      <el-input v-model="TeaInfo.name" style="width: 150px;" placeholder="请输入"></el-input>
    </el-descriptions-item>
    <el-descriptions-item >
      <template slot="label">
        <i class="el-icon-picture-outline-round"></i>
        证件照
      </template>
      <div class="demo-image" style="margin: auto">
        <img :src="avatarInfo.imageUrl" class="avatar">
        修改照片：
        <input class="input" type="file" value="上传" @change="selectImgChange" ref="imgfile" >
      </div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-male"></i>
        性别
      </template>
      <el-input v-model="TeaInfo.sex" style="width: 150px;" placeholder="请输入"></el-input>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      <el-input v-model="TeaInfo.phone" style="width: 150px;" placeholder="请输入"></el-input>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        户籍
      </template>
      <el-input v-model="TeaInfo.nativeplace" style="width: 150px;" placeholder="请输入"></el-input>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-school"></i>
        学院
      </template>
      <el-input v-model="TeaInfo.college" style="width: 150px;" placeholder="请输入"></el-input>
    </el-descriptions-item>



    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-date"></i>
        入职时间
      </template>
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="TeaInfo.date"
            type="date"
            placeholder="请选择"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 150px">
        </el-date-picker>
      </div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-star-off"></i>
        政治面貌
      </template>
      <el-select v-model="TeaInfo.polstatus"  style="width: 150px" placeholder="请选择">
        <el-option
            v-for="item in polstatus"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
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
      <el-input v-model="TeaInfo.marriage" style="width: 200px;" placeholder="请输入"></el-input>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      <el-input v-model="TeaInfo.location" style="width: 200px;" placeholder="请输入"></el-input>
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
        location:'',
        imgfile:''
      },
      avatarInfo:{
        imageUrl: ''
      },
      polstatus:['中共党员','共青团员','群众','其他']
    };
  },
  methods: {
    selectImgChange:function(){
      // if(lastfile!=(this.$refs.imgfile.files[0])) {
      let file = this.$refs.imgfile.files[0];
      this.TeaInfo.imgfile=new FormData();
      this.TeaInfo.imgfile.append("file",file);
      var reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        //改变img的路径
        self.$set(self.avatarInfo,'imageUrl',reader.result);
      };
      // lastfile=file;
      // }
    },
    saveInfo(){
      axios({
        method:'post',
        url:"http://localhost:8090/teacher/modifyTeacher",
        data:this.TeaInfo.imgfile,
        params:{
          id:self.TeaInfo.id,
          name:self.TeaInfo.name,
          sex:self.TeaInfo.sex,
          college:self.TeaInfo.college,
          marriage:self.TeaInfo.marriage,
          phone:self.TeaInfo.phone,
          date:self.TeaInfo.date,
          nativeplace:self.TeaInfo.nativeplace,
          polstatus:self.TeaInfo.polstatus,
          location:self.TeaInfo.location,
          remark:self.TeaInfo.remark
        }
      }).then((response)=>{
        //   axios.post("http://localhost:8090/student/modifyStudent",this.StuInfo)
        //   .then((response)=>{
        if(response.code=="200")
        {
          if(response.message=="good")
          {
            self.$message({
              message: '保存成功',
              type: 'success'
            });
            sessionStorage.setItem("user", JSON.stringify(response.data));
            teacher=JSON.parse(sessionStorage.getItem("user"));
            self.$set(self.avatarInfo,'imageUrl','http://localhost:8090/'+teacher.avatar);
            self.TeaInfo.imgfile=null;
          }
          else if(response.message=="bad")
          {
            self.$message({
              message: '无需保存',
              type: 'warning'
            });
          }
        }
      }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });
    }
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