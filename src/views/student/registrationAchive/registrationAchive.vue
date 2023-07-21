<template>
<div>
  <el-descriptions class="margin-top" title="基本信息登记" :column="2"  style="font-size:16px;width:85% " border>
    <template slot="extra">
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        查询审核流程
      </el-button>
      <el-button type="primary" @click="submit" >提交</el-button>
    </template>

    <el-descriptions-item >
      <template slot="label">
        <i class="el-icon-sunset"></i>
        学号
      </template>
     <el-input v-model="AchieveInfo.id" style="width: 150px;" disabled></el-input>
    </el-descriptions-item>

    <el-descriptions-item >
      <template slot="label">
        <i class="el-icon-folder-opened"></i>
        附件
      </template>
      <input class="input" type="file" value="上传" @change="selectImgChange" ref="file" >
    </el-descriptions-item>

    <el-descriptions-item >
      <template slot="label">
        <i class="el-icon-edit-outline"></i>
        内容
      </template>
      <el-input v-model="AchieveInfo.context"   placeholder="请输入" ></el-input>
    </el-descriptions-item>
  </el-descriptions>

<el-drawer
    title="我是标题"
    :visible.sync="drawer"
    :with-header="false">
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="item in lines" :timestamp="item.time" placement="top" style="margin-top: 20px">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>

    </el-timeline>
  </div>
</el-drawer>
</div>
</template>
<script>
import axios from "axios";
var line;
var stu;
var avatarData;
var self;
export default {
  created() {
    stu=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.AchieveInfo,'id',stu.id);
    this.$set(this.AchieveInfo,'name',stu.name);
    self=this;
    this.getAchieve()
  },
  methods:{
    getAchieve(){
      this.lines=[]
      this.$set(this.AchieveInfo,'time',null);
      this.$set(this.AchieveInfo,'context',null);
      this.$set(this.AchieveInfo,'state',null);
      this.$set(this.AchieveInfo,'path',null);
      avatarData=null;
      axios({
        method:'post',
        url:"http://localhost:8090/student/GetAchieve",
        data:this.AchieveInfo,
      }).then((response)=>{
        if(response.code=="200")
        {
          if(response.message=="good")
          {
            self.$set(self.AchieveInfo,'state',false);
          }
          else
          {
            self.$set(self.AchieveInfo,'state',true);
          }
          response.data.forEach((item)=>
          {
            var con;
            if(item.state==0)
              con='待审核';
            else if(item.state==1)
              con='审核通过';
            else con='审核失败';
            line={
              time:item.time,
              title:stu.name+"提交了科研成果登记",
              content:con
            }
            this.lines.push(line);
          }
          );
        }
      }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });
    },
    submit(){
      if(!this.AchieveInfo.state)
        this.$message({
          message: '存在待审核的记录，请勿重复提交',
          type: 'warning'
        });
      else{
      if(avatarData==null)
        this.$message({
                  message: '请添加附件',
                  type: 'error'
                });
      else
      {
        axios({
          method:'post',
          url:"http://localhost:8090/student/Achieve",
          data:avatarData,
          params:{
              id:this.AchieveInfo.id,
              context:this.AchieveInfo.context
          }
        }).then((response)=>{
          if(response.code=="200")
          {
            if(response.message=="good")
            {
              this.$message({
                message: '提交成功，等待审核',
                type: 'success'
              });
              self.getAchieve();
            }
          }
        }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
      }
    }},
    selectImgChange:function(){
      let file = this.$refs.file.files[0];
      avatarData=new FormData();
      avatarData.append("file",file);

    }
  },
  data() {
    return {
      AchieveInfo:{
        id:'',
        name:'',
        time:'',
        context:'',
        state:'',
        path:''
      },
      lines:[],
      drawer: false,
    };
  }
};
</script>