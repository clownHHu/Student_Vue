<template>
  <div>
  <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
    <el-table-column
        prop="achid"
        label="编号">
    </el-table-column>
    <el-table-column
        prop="time"
        label="时间">
    </el-table-column>
    <el-table-column
        prop="id"
        label="学号">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名">
    </el-table-column>
    <el-table-column
        prop="context"
        label="内容">
    </el-table-column>
    <el-table-column
        prop="status"
        label="状态">
    </el-table-column>
    <el-table-column
        label="查看附件">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-search" @click="handleClick(scope.row)"size="small" round>查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
        prop="operate"
        label="操作"
    width="200px">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-close" @click="handleOperate(scope.row,2)"size="small" round></el-button>
        <el-button type="primary" icon="el-icon-check" @click="handleOperate(scope.row,1)"size="small" round></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
  <span>确定提交</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="subOperate()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<style>
.el-table .warning-row {
  background: rgba(128, 128, 128, 0.8);
}

.el-table .success-row {
  background: rgba(50, 205, 50, 0.8);
}
</style>

<script>
import axios from "axios";
var tea;
var self;
var flag;
var achieve;
export default {
  created() {

    self=this;
    tea=JSON.parse(sessionStorage.getItem("user"));
    this.TeacherId=tea.id;
    this.receiveAchieve();
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    tableRowClassName({row, rowIndex}) {
      if (this.tableData.at(rowIndex).status === '审核失败') {
        return 'warning-row';
      } else if (this.tableData.at(rowIndex).status === '审核通过') {
        return 'success-row';
      }
      return '';
    },
    handleClick(row) {
        window.open('http://localhost:8090/'+row['search']);
    },
    subOperate(){
      this.dialogVisible=false;
      axios({
        method:'post',
        url:"http://localhost:8090/teacher/handleAchieve",
        params:{
          id:this.achieve['id'],
          time:this.achieve['time'],
          flag:this.flag
        }
      })
          .then((response)=>{
            if(response.code=='200'){
              if(response.message==='good'){
                this.$message({
                  message: "审核通过",
                  type: 'success'
                });
              }
              else
                this.$message({
                  message: "审核退回",
                  type: 'error'
                });
              self.receiveAchieve()
            }
          }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
        console.log(error);
      });

    },
    handleOperate(row,flag){
      if(row['status']==='待审核'){
        this.flag=flag;
        this.achieve=row;
        this.dialogVisible=true
      }
      else
        this.$message({
        message: "无需再次提交",
        type: 'warning'
      });
    },
    receiveAchieve() {
      this.tableData=[]
      axios({
        method:'get',
        url:"http://localhost:8090/teacher/checkAchieve",
        params:{
          TeacherId:this.TeacherId
        }
      })
          .then((response)=>{
            if(response.code=='200')
            {
              if(response.data!=null)
              {

                response.data.forEach((item,index)=>{
                  var locdata={
                    achid:item.achid,
                    id:item.id,
                    time:item.time,
                    name:item.name,
                    context:item.context,
                    status:'',
                    search:item.path,
                  }
                  if(item.state===0)
                  {
                    locdata.status="待审核";
                  }
                  else if(item.state===1)
                  {
                    locdata.status="审核通过";
                  }
                  else if(item.state===2)
                  {
                    locdata.status="审核失败";
                  }
                  self.tableData.push(locdata);
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
      drawer: false,
      tableData: [],
      TeacherId:'',
      dialogVisible: false
    }
  },
}
</script>