<template>
  <div>
    <el-button style="margin-left:1240px" icon="el-icon-plus" @click="handleClick(null,null,2)"  type="primary"size="small"></el-button>
  <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 20px">
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
        width="120"
        label="操作">
      <template slot-scope="scope">
        <el-button icon="el-icon-edit" @click="handleClick(scope.row,scope.$index,0)"  type="primary"size="small"></el-button>
        <el-button icon="el-icon-delete" @click="handleClick(scope.row,scope.$index,1)" type="primary" size="small"></el-button>
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
        title="操作"
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
            label="学号">
          <template slot-scope="scope">
            <el-input :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).id" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="姓名">
          <template slot-scope="scope">
            <el-input :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).name" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="手机号">
          <template slot-scope="scope">
            <el-input :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).phone" style="width: 280px"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer
        title="操作"
        style="height: 1500px"
        :visible.sync="drawerplus"
        direction="ttb"
        :before-close="handleClose">
      <el-button style="margin-left: 1250px" type="primary" @click="handleOperate()">保存</el-button>
      <el-table
          :data="stuData"
          border
          style="width: 80%;margin-top: 20px;margin-left:100px">
        <el-table-column
            label="学号">
          <template slot-scope="scope">
            <el-input  v-model="stuData.id" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="姓名">
          <template slot-scope="scope">
            <el-input  v-model="stuData.name" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="学院">
          <template slot-scope="scope">
            <el-input  disabled  v-model="stuData.at(scope.$index).college" style="width: 280px"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";
var self,adm,stu,flag,index,oldid
export default {
  created() {
    adm=JSON.parse(sessionStorage.getItem("user"));
    self=this
    this.getStudents()
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
    handleClick(row,index,flag) {
      this.stu=row
      this.flag=flag
      if(index!=null)
        this.index=index
      if(row!=null)
        this.oldid=row.id
      //删除
      if(flag==1)
        this.dialogVisible=true
      //编辑
      else if (flag==0) {
        this.dis[index]=false
        this.drawer = true;
      }
      //添加
      else if(flag==2){
        this.drawerplus=true;
        this.stuData=[]
        this.stuData.push({
          id:"",
          name:"",
          college: adm.college
        })
      }
      else
        this.drawer = true;
    },
    handleOperate(){
      this.dialogVisible=false
      this.drawer=false
      //编辑
      if (this.flag==0){
        var modify=false
        this.dis[this.index]=true
        this.tableData.forEach((item,index)=>{
          if(item.id===this.tableData.at(this.index).id&&index!==this.index){
            modify=true
          }
        })
        if(modify==false) {
          axios({
            method:'post',
            url:"http://localhost:8090/admin/modifyStudents",
            data:this.tableData.at(this.index),
            params:{
              oldid:this.oldid
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
        }
        else this.$message({
          message: "修改失败（学号重复）",
          type: 'error'
        });
      }
      //删除
      else if(this.flag==1){
        axios({
          method:'post',
          url:"http://localhost:8090/admin/deleteStudents",
          params:{
            id:this.tableData.at(this.index).id
          }
        })
          .then((response)=>{
            if(response.code=='200')
            {
              self.tableData.splice(this.index,1);
              self.dis.pop()
              self.$message({
                message: "删除成功",
                type: 'success'
              });
            }
          }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
      }
      //添加
      else if(this.flag==2){
        var plus=false
        if(this.stuData.at(0).id==""||this.stuData.at(0).name==""){
          this.$message({
            message: "选项为空",
            type: 'warning'
          });
        }
        else {
          this.drawerplus=false
          this.tableData.forEach((item)=>{
            if(item.id===this.stuData.at(0).id){
              plus=true
            }
          })
          if(plus==false) {
            axios({
              method:'post',
              url:"http://localhost:8090/admin/addStudents",
              data:this.stuData.at(0),
              params:{
                id:adm.id
              }
            })
                .then((response)=>{
                  if(response.code=='200')
                  {
                    if(response.message=='good'){
                      self.tableData.push(this.stuData.at(0))
                      self.dis.push(true)
                      self.$message({
                        message: "添加成功",
                        type: 'success'
                      });
                      self.getStudents()
                    }
                    else {
                      self.$message({
                        message: "添加失败（已存在此学生）",
                        type: 'error'
                      });
                    }

                  }
                }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
              console.log(error);
            }); }

          else
            this.$message({
              message: "添加失败（学号重复）",
              type: 'error'
            });


      }
      }
    },
    getStudents(){
        this.tableData=[]
        axios({
          method:'get',
          url:"http://localhost:8090/admin/getStudents",
          params:{
            AdmId:adm.id
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
      stuData:[],
      dialogVisible: false,
      drawer:false,
      drawerplus:false,
      dis:[]
    }
  }
}
</script>