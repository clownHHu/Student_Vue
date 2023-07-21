<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 80%">
    <el-table-column
        prop="term"
        label="学期">
    </el-table-column>
    <el-table-column
        prop="coursename"
        label="课程名">
    </el-table-column>
    <el-table-column
        prop="time"
        label="课程时间">
    </el-table-column>
    <el-table-column
        prop="context"
        label="课程大纲">
    </el-table-column>
    <el-table-column
        label="操作">
      <template slot-scope="scope">
        <el-button style="margin-left: 60px" @click="changeCourse(scope.$index)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-drawer
        style="height: 1500px"
        :visible.sync="drawer"
        direction="ttb"
        :before-close="handleClose">
      <el-descriptions title="课程信息" :column="3"  style="font-size:16px;width:85%;margin-left:100px">
        <template slot="extra">
          <el-button type="primary" @click="changeContext">保存</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            学期
          </template>
          <el-input v-model="locData.term" disabled="true"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            课程名
          </template>
          <el-input v-model="locData.coursename" disabled="true"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">

            课程时间
          </template>
          <el-input v-model="locData.time" disabled="true"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            课程大纲
          </template>
          <el-input type="textarea" v-model="locData.context" autosize></el-input>
        </el-descriptions-item>
      </el-descriptions>

    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
var self;
var teacher;

export default {
  created() {
    teacher=JSON.parse(sessionStorage.getItem("user"));
    self=this;
    this.$set(this.TeaInfo,'name',teacher.name);
    this.getCourse();
  },
  data() {
    return {
      TeaInfo:{
        name:''
      },
      tableData: [],
      locData:{
        term:'',
        coursename:'',
        time:'',
        context: ''
      },
      drawer: false,
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    changeCourse(index)
    {
      this.locData=this.tableData.at(index);
      this.drawer = true;
    },
    getDay(index)
    {
      var day=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
      return day[Number(index)-1];
    },
    changeContext()
    {
      this.drawer = false;
      axios({
        method:'post',
        url:"http://localhost:8090/teacher/changeCourse",
        params: {
          name:this.locData.coursename,
          context:this.locData.context
        }
      }).then((response)=>{
        if(response.code=="200")
        {
          if(response.message=="good")
          {
            self.$message({
              message: '保存成功',
              type: 'success'
            });
          }
          else if(response.message=="bad")
          {
            self.$message({
              message: '无需修改',
              type: 'warning'
            });
          }
        }
        self.getCourse();
      }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });

    },
    getCourse(){
      this.tableData=[];
      axios({
        method:'get',
        url:"http://localhost:8090/teacher/checkCourse",
        params: {
          name:this.TeaInfo.name
        }
      }).then((response)=>{
        if(response.code=="200")
        {
         response.data.forEach((item)=>{
         var data={
           term: item.term,
           coursename: item.name,
           time: self.getDay(item.day)+"\t第"+item.bepos+"-"+item.enpos+"节",
           context: item.context
         };
         self.tableData.push(data);
         }
         );
        }
      }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });
    }
  }
}
</script>