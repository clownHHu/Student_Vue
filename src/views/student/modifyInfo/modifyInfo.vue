<template>

  <el-descriptions class="margin-top" title="个人基本信息" :column="3"  style="font-size:16px;width:85% " border>
    <template slot="extra">
      <el-button type="primary" @click="saveInfo">保存</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-sunset"></i>
        学号
      </template>
      <el-input v-model="StuInfo.id" style="width: 150px;" placeholder="请输入" :disabled="true"></el-input>

    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        姓名
      </template>
      <el-input v-model="StuInfo.name" style="width: 150px;" placeholder="请输入"></el-input>

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
      <el-radio v-model="StuInfo.sex" label="男">男</el-radio>
      <el-radio v-model="StuInfo.sex" label="女">女</el-radio>

    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      <el-input v-model="StuInfo.phone" style="width: 150px;" placeholder="请输入"></el-input>

    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        生源地
      </template>
      <el-select v-model="StuInfo.nativeplace"  style="width: 150px" placeholder="请选择">
          <el-option
              v-for="item in cities"
              :label="item"
              :value="item">
          </el-option>
      </el-select>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-school"></i>
        学院
      </template>
      <el-input v-model="StuInfo.college" style="width: 150px;" placeholder="请输入"></el-input>

    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-guide"></i>
        班级
      </template>
      <el-select v-model="StuInfo.classn"  style="width: 150px" placeholder="请选择">
        <el-option
            v-for="item in classns"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-reading"></i>
        专业
      </template>
      <el-input v-model="StuInfo.major" style="width: 150px;" placeholder="请输入"></el-input>

    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-date"></i>
        入学时间
      </template>
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="StuInfo.date"
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
      <el-select v-model="StuInfo.polstatus"  style="width: 150px" placeholder="请选择">
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
        备注
      </template>
      <el-tag size="small">{{StuInfo.remark}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-ship"></i>
        身份证号
      </template>
      <el-input v-model="StuInfo.idnumber" style="width: 200px;" placeholder="请输入"></el-input>

    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      <el-input v-model="StuInfo.location" style="width: 500px;" placeholder="请输入"></el-input>

    </el-descriptions-item>



  </el-descriptions>

</template>


<script>
const {province} = require('province-city-china/data');

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
    province.forEach((n)=>
        {
          this.cities.push(n.name);
        }
    );
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
        remark:'',
        imgfile:''
      },
      avatarInfo:{
        stuid:'',
        imageUrl: ''
      },
      cities:[],
      classns:['1班','2班','3班','4班','5班'],
      polstatus:['中共党员','共青团员','群众','其他']
    };
  },
  methods: {
    saveInfo(){
      axios({
        method:'post',
        url:"http://localhost:8090/student/modifyStudent",
        data:this.StuInfo.imgfile,
        params:{
          id:self.StuInfo.id,
          name:self.StuInfo.name,
          sex:self.StuInfo.sex,
          college:self.StuInfo.college,
          classn:self.StuInfo.classn,
          phone:self.StuInfo.phone,
          major:self.StuInfo.major,
          idnumber:self.StuInfo.idnumber,
          date:self.StuInfo.date,
          nativeplace:self.StuInfo.nativeplace,
          polstatus:self.StuInfo.polstatus,
          location:self.StuInfo.location,
          remark:self.StuInfo.remark
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
          stu=JSON.parse(sessionStorage.getItem("user"));
          self.$set(self.avatarInfo,'imageUrl','http://localhost:8090/'+stu.avatar);
          self.StuInfo.imgfile=null;
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
    },
    selectImgChange:function(){
      // if(lastfile!=(this.$refs.imgfile.files[0])) {
      let file = this.$refs.imgfile.files[0];
      this.StuInfo.imgfile=new FormData();
      this.StuInfo.imgfile.append("file",file);
      var reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        //改变img的路径
        self.$set(self.avatarInfo,'imageUrl',reader.result);
      };
      // lastfile=file;
      // }
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