<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 20px">
      <el-table-column
          fixed
          prop="name"
          label="课程名">
      </el-table-column>
      <el-table-column
          prop="teacher"
          label="任教老师">
      </el-table-column>
      <el-table-column
          prop="term"
          label="学期">
      </el-table-column>
      <el-table-column
          prop="now"
          label="现有人数">
      </el-table-column>
      <el-table-column
          prop="num"
          label="容量">
      </el-table-column>
      <el-table-column
          fixed="right"
          width="180"
          label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleClick(scope.row,scope.$index,0)"  type="primary"size="small"></el-button>
          <el-button icon="el-icon-plus" @click="handleClick(scope.row,scope.$index,1)"  type="primary"size="small"></el-button>
          <el-button icon="el-icon-minus" @click="handleClick(scope.row,scope.$index,2)"  type="primary"size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>确定操作</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleOperate()">确 定</el-button>
  </span>
    </el-dialog>

    <el-drawer
        :title="mycollege"
        style="height: 1500px"
        :visible.sync="drawer"
        direction="ttb"
        :before-close="handleClose">
      <el-button style="margin-left: 1250px" type="primary" @click="handleOperate">保存</el-button>
      <el-table
          :data="tableData"
          border
          style="width: 80%;margin-top: 20px;margin-left:100px">
        <el-table-column
            label="课程名">
          <template slot-scope="scope">
            <el-input disabled v-model="tableData.at(scope.$index).name" style="width: 180px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="任教老师">
          <template slot-scope="scope">
            <el-input disabled v-model="tableData.at(scope.$index).teacher" style="width: 180px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="学期">
          <template slot-scope="scope">
            <el-input disabled v-model="tableData.at(scope.$index).term" style="width: 180px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="现有人数">
          <template slot-scope="scope">
            <el-input disabled v-model="tableData.at(scope.$index).now" style="width: 180px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="容量">
          <template slot-scope="scope">
            <el-input :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).num" style="width: 180px"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>


    <el-drawer
        :title="mycourse"
        style="height: 1500px"
        :visible.sync="plusdrawer"
        direction="ttb"
        :before-close="handleClose">
      <el-button style="margin-left: 1250px" type="primary" @click="backButton">返回</el-button>
      <el-table
          :data="nullCourseStudents"
          border
          style="width: 80%;margin-top: 20px;margin-left:100px">
        <el-table-column
            fixed
            prop="id"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="college"
            label="学院">
        </el-table-column>
        <el-table-column
            prop="classn"
            label="班级">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="idnumber"
            label="身份证号">
        </el-table-column>
        <el-table-column
            prop="date"
            label="入学日期">
        </el-table-column>
        <el-table-column
            prop="nativeplace"
            label="生源">
        </el-table-column>
        <el-table-column
            prop="polstatus"
            label="政治面貌">
        </el-table-column>
        <el-table-column
            prop="location"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注">
        </el-table-column>
        <el-table-column
            fixed="right"
            width="60"
            label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-circle-plus-outline" @click="addStudent(scope.row,scope.$index)" type="primary" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer
        :title="mycourse"
        style="height: 1500px"
        :visible.sync="minusdrawer"
        direction="ttb"
        :before-close="handleClose">
      <el-button style="margin-left: 1250px" type="primary" @click="backButton">返回</el-button>
      <el-table
          :data="coursen"
          border
          style="width: 80%;margin-top: 20px;margin-left:100px">
        <el-table-column
            fixed
            prop="id"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="college"
            label="学院">
        </el-table-column>
        <el-table-column
            prop="classn"
            label="班级">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号">
        </el-table-column>
        <el-table-column
            prop="idnumber"
            label="身份证号">
        </el-table-column>
        <el-table-column
            prop="date"
            label="入学日期">
        </el-table-column>
        <el-table-column
            prop="nativeplace"
            label="生源">
        </el-table-column>
        <el-table-column
            prop="polstatus"
            label="政治面貌">
        </el-table-column>
        <el-table-column
            prop="location"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注">
        </el-table-column>
        <el-table-column
            fixed="right"
            width="60"
            label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" @click="deleteStudent(scope.row,scope.$index)" type="primary" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";
var self,adm,flag,index
export default {
  created() {
    adm=JSON.parse(sessionStorage.getItem("user"));
    this.mycollege=adm.college
    self=this
    this.getCourses()
  },
  methods: {
    handleClose(done) {
      this.dis[this.index]=true

      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    backButton(){
      if(this.minusdrawer===true)
        this.minusdrawer=false
      if(this.plusdrawer===true)
        this.plusdrawer=false
    },
    addStudent(row,index){
      if(this.tableData.at(this.index).now<this.tableData.at(this.index).num){
        axios({
          method:'post',
          url:"http://localhost:8090/admin/addCourse",
          params:{
            stuid:row.id,
            name:this.mycourse,
            teacher:this.myteacher
          }
        })
            .then((response)=>{
              if(response.code=='200')
              {
                if(response.message=='good')
                {
                  self.$message({
                    message: "添加成功",
                    type: 'success'
                  });
                  self.nullCourseStudents.splice(index,1)
                }
                else{
                  self.$message({
                    message: "未找到学生信息",
                    type: 'warning'
                  });
                }
                self.getCourses()
              }
            }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
      }
      else
        this.$message({
          message: "容量已满",
          type: 'warning'
        });

    },
    deleteStudent(row,index){
      axios({
        method:'post',
        url:"http://localhost:8090/admin/removeCourse",
        params:{
          id:row.id,
          name:this.mycourse
        }
      })
          .then((response)=>{
            if(response.code=='200')
            {
              if(response.message=='good')
              {
                self.$message({
                  message: "已删除",
                  type: 'success'
                });
                self.coursen.splice(index,1)
              }
              else{
                self.$message({
                  message: "未找到学生信息",
                  type: 'warning'
                });

              }
              self.getCourses()
            }
          }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });
    },
    handleClick(row,index,flag) {
      this.index=index
      this.dis[index]=false
      this.mycourse=row.name
      this.myteacher=row.teacher
      this.flag=flag;
      if(flag===0)
        this.drawer = true;
      else if(flag===1)
      {
        if(row.now<row.num)
        {
          this.plusdrawer = true;
          this.nullCourseStudents=[]
          axios({
            method:'get',
            url:"http://localhost:8090/admin/getnullCourseStudents",
            params:{
              college:adm.college,
              course:this.tableData.at(this.index).name,
            }
          })
              .then((response)=>{
                if(response.code=='200')
                {
                  if(response.data!=null)
                  {
                    response.data.forEach((item,index)=>{
                      var locdata={
                        id:item.id,
                        name:item.name,
                        sex:item.sex,
                        college:item.college,
                        classn:item.classn,
                        phone:item.phone,
                        major:item.major,
                        idnumber:item.idnumber,
                        date:item.date,
                        nativeplace:item.nativeplace,
                        polstatus:item.polstatus,
                        location:item.location,
                        remark:item.remark
                      }
                      self.nullCourseStudents.push(locdata)
                    });
                  }
                  else{
                    self.$message({
                      message: "未找到学生信息",
                      type: 'warning'
                    });

                  }
                }
              }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
            console.log(error);
          });
        }
        else
          this.$message({
            message: "容量已满",
            type: 'warning'
          });
      }
      else if(flag===2)
      {
        if(row.now>0){
          this.minusdrawer = true;
          this.coursen=[]
          axios({
            method:'get',
            url:"http://localhost:8090/admin/getCourse",
            params:{
              name:this.tableData.at(this.index).name,
              teacher:this.tableData.at(this.index).teacher
            }
          })
              .then((response)=>{
                if(response.code=='200')
                {
                  if(response.data!=null)
                  {
                    response.data.forEach((item,index)=>{
                      var locdata={
                        id:item.id,
                        name:item.name,
                        sex:item.sex,
                        college:item.college,
                        classn:item.classn,
                        phone:item.phone,
                        major:item.major,
                        idnumber:item.idnumber,
                        date:item.date,
                        nativeplace:item.nativeplace,
                        polstatus:item.polstatus,
                        location:item.location,
                        remark:item.remark
                      }
                      self.coursen.push(locdata)
                    });
                  }
                  else{
                    self.$message({
                      message: "未找到学生信息",
                      type: 'warning'
                    });

                  }
                }
              }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
            console.log(error);
          });
        }
        else
          this.$message({
            message: "课程为空",
            type: 'warning'
          });
      }
    },
    handleOperate(){
      this.dialogVisible=false
      this.plusdrawer=false
      this.minusdrawer=false
      //this.dis[this.index]=true
      //编辑
      if(this.flag===0){
        if(this.tableData.at(this.index).num>=this.tableData.at(this.index).now){
          this.drawer=false
          axios({
            method:'post',
            url:"http://localhost:8090/admin/modifyCourse",
            params:{
              nums:this.tableData.at(this.index).num,
              name:this.tableData.at(this.index).name,
              teacher:this.tableData.at(this.index).teacher
            }
          })
              .then((response)=>{
                if(response.code=='200')
                {
                  self.$message({
                    message: "修改成功",
                    type: 'success'
                  });
                }
              }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
            console.log(error);
          });
          this.dis[this.index]=true
        }
        else this.$message({
          message: "容量不足",
          type: 'warning'
        });

      }


    },
    getCourses(){
      this.tableData=[]
      axios({
        method:'get',
        url:"http://localhost:8090/admin/getCourses",
        params:{
          college:adm.college
        }
      })
          .then((response)=>{
            if(response.code=='200')
            {
              if(response.data!=null)
              {
                var json=response.data;
                json.course.forEach((item,index)=>{
                  var locdata={
                    term:item.term,
                    name:item.name,
                    teacher:item.teacher,
                    num:item.num,
                    now:json.nums.at(index)
                  }
                  self.tableData.push(locdata);
                  self.dis.push(true)
                });
              }
            }
          }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });

    }
  },

  data() {
    return {
      tableData: [],
      coursen:[],
      theclass:"",
      nullCourseStudents:[],
      mycollege:"",
      mycourse:"",
      myteacher:"",
      dialogVisible: false,
      drawer:false,
      plusdrawer:false,
      minusdrawer:false,
      dis:[]
    }
  }
}
</script>