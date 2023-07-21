<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 20px">
      <el-table-column
          fixed
          prop="stuid"
          label="学号">
      </el-table-column>
      <el-table-column
          prop="stuname"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="teaname"
          label="导师">
      </el-table-column>
      <el-table-column
          fixed="right"
          width="120"
          label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleClick(scope.row,scope.$index)"  type="primary"size="small"></el-button>
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
            <el-input disabled v-model="tableData.at(scope.$index).stuid" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="姓名">
          <template slot-scope="scope">
            <el-input disabled v-model="tableData.at(scope.$index).stuname" style="width: 280px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="导师">
          <template slot-scope="scope">
<!--            <el-input :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).teaname" style="width: 280px"></el-input>-->
          <el-select :disabled="dis.at(scope.$index)" v-model="tableData.at(scope.$index).teaname" placeholder="请选择">
            <el-option
                v-for="item in teanames"

                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>


  </div>
</template>

<script>
import axios from "axios";
var self,adm,stu,flag,index
export default {
  created() {
    adm=JSON.parse(sessionStorage.getItem("user"));
    self=this
    this.getRelations()
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
    handleClick(row,index) {
      this.stu=row
      this.flag=flag
      this.index=index
      this.dis[index]=false
      this.drawer = true;
    },
    handleOperate(){
      this.dialogVisible=false
      this.drawer=false
      this.dis[this.index]=true
      //编辑
      axios({
        method:'post',
        url:"http://localhost:8090/admin/modifyRelations",
        params:{
          stuid:this.tableData.at(this.index).stuid,
          teaname:this.tableData.at(this.index).teaname,
          admid:adm.id
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

    },
    getRelations(){
      this.tableData=[]
      this.teanames=[]
      axios({
        method:'get',
        url:"http://localhost:8090/admin/getRelations",
        params:{
          AdmId:adm.id
        }
      })
          .then((response)=>{
            if(response.code=='200')
            {
              if(response.data!=null)
              {
                var json=response.data;
                json.relations.forEach((item,index)=>{
                  var locdata={
                    stuid:item.stuid,
                    teaid:item.teaid,
                    admid:item.admid,
                    stuname:json.stunames.at(index),
                    teaname:json.teanames.at(index)==='-1'?"无":json.teanames.at(index)
                  }
                  self.tableData.push(locdata);
                  self.dis.push(true)
                });
                json.allteanames.forEach((item)=> {
                  var locadata={
                        value: item,
                        label: item
                      }
                  self.teanames.push(locadata)
                }
                )
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
      teanames:[],
      dialogVisible: false,
      drawer:false,
      dis:[]
    }
  }
}
</script>