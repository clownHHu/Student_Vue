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
          <el-button style="margin-left: 60px" @click="changeCourse(scope.$index)">打分</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
        :title="this.locData.coursename"
        style="height: 1500px"
        :visible.sync="drawer"
        direction="ttb"
        :before-close="handleClose">
      <el-button style="margin-left: 1250px" type="primary" @click="changeScore">保存</el-button>
      <el-table
          :data="StudentData"
          border
          style="width: 80%;margin-top: 20px;margin-left:100px">
        <el-table-column
            prop="id"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            label="成绩">
          <template slot-scope="scope">
            <el-input v-model="StudentData.at(scope.$index).score" style="width: 80px"></el-input>
          </template>
        </el-table-column>
      </el-table>
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
      StudentData:[],
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
      this.StudentData=[];
      this.locData=this.tableData.at(index);
      axios({
        method:'get',
        url:"http://localhost:8090/teacher/checkScore",
        params: {
          name:this.locData.coursename,
        }
      }).then((response)=>{
        if(response.code=="200")
        {
          response.data.forEach((item)=>{
                var a={
                    id:item.id,
                    name:item.name,
                    coursename:self.locData.coursename,
                    score:item.score
                };
                this.StudentData.push(a);
          }
          );
        }
        self.getCourse();
      }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });
      this.drawer = true;
    },
    getDay(index)
    {
      var day=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
      return day[Number(index)-1];
    },
    changeScore()
    {
      this.drawer = false;
      axios({
        method:'post',
        url:"http://localhost:8090/teacher/changeScore",
        data: this.StudentData
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