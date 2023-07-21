<template>
<div>
<div style="padding-left: 20px">学期
  <el-select style="padding-left: 20px" v-model="StuInfo.selectTime" filterable placeholder="请选择">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
  <el-button style="margin-left: 30px" icon="el-icon-search" circle @click="receiveGrade"></el-button>
</div>
  <tr>
    <td style="width: 600px">
<el-table
    stripe
    :data="tableBData"
    show-summary
    :summary-method="getBSummaries"
    style="width: 100%;margin-top: 20px">
  <el-table-column label="必修课">
<el-table-column
    prop="name"
    label="课程">
</el-table-column>
<el-table-column
    prop="credit"
    label="学分">
</el-table-column>
<el-table-column
    prop="term"
    label="学期">
</el-table-column>
<el-table-column
    prop="score"
    label="成绩">
</el-table-column>
  </el-table-column>
</el-table>
    </td>
    <td style="width: 600px">
      <el-table
          stripe
          :data="tableXData"
          :summary-method="getXSummaries"
          show-summary
          style="width: 100%;margin-top: 20px">
        <el-table-column label="选修课">
          <el-table-column
              prop="name"
              label="课程">
          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分">
          </el-table-column>
          <el-table-column
              prop="term"
              label="学期">
          </el-table-column>
          <el-table-column
              prop="score"
              label="成绩">
          </el-table-column>
        </el-table-column>
      </el-table>
    </td>
  </tr>

  <el-table
      style="width: 600px"
      :data="totalScore"
      >
    <el-table-column prop="item1"></el-table-column>
    <el-table-column prop="total"></el-table-column>
    <el-table-column prop="item3"></el-table-column>
    <el-table-column prop="item4"></el-table-column>

  </el-table>

</div>
</template>

<script>
import axios from "axios";
var self,stu;
var total;
var flag;
var empty=[{
  type:'',
  name: '',
  credit: '',
  term: '',
  score: '',
  pass:'0'},
];
export default {
  created() {
    self=this;
    this.flag=0;
    stu=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.StuInfo,'id',stu.id);
  },
  mounted() {
    this.receiveGrade();
  },
  data() {
    return {
      options: [{
        value: '2022-2023学年秋',
        label: '2022-2023学年秋'
      }, {
        value: '2021-2022学年春',
        label: '2021-2022学年春'
      }, {
        value: '2021-2022学年秋',
        label: '2021-2022学年秋'
      }, {
        value: '2020-2021学年春',
        label: '2020-2021学年春'
      }, {
        value: '成绩总览',
        label: '成绩总览'
      }],
      StuInfo:{
        selectTime:"成绩总览",
        id:''
      },
      totalScore:[{
        item1:'总学分:',
        total:'',
        item3:'应修总学分:',
        item4:'34学分'
      }],
      tableBData: [{
        type:'',
        name: '',
        credit: '',
        term: '',
        score: '',
        pass:'0'},
      ],
      tableXData: [{
        type:'',
        name: '',
        credit: '',
        term: '',
        score: '',
        pass:'0'},
      ]
    };
  },
  methods: {
    receiveGrade(){
        self.tableXData=[];
        self.tableBData=[];
        axios({
          method:'post',
          url:"http://localhost:8090/student/checkGrade",
          params:{
            term:this.StuInfo.selectTime,
            id:this.StuInfo.id
          }
        })
          .then((response)=>{
          if(response.code=='200')
          {
            if(response.data!=null)
            {
              self.total=0;
              for(var i=0;i<response.data.credit.length;i++)
              {
                  var locdata={
                    type:'',
                    name: '',
                    credit: '',
                    term: '',
                    score: '',
                    pass:'0'
                  }
                  locdata.score=response.data.score.at(i);
                  locdata.credit=response.data.credit.at(i);
                  locdata.term=response.data.term.at(i);
                  locdata.name=response.data.course.at(i);
                  locdata.type=response.data.type.at(i);
                  if(locdata.type==="必修课")
                    self.tableBData.push(locdata);
                  else if(locdata.type==="选修课")
                    self.tableXData.push(locdata);
                  self.total+=Number(response.data.total.at(i));
              }
              if(self.flag===0){
                self.flag=1;
                self.$set(self.totalScore[0],'total',self.total);
              }


            }
            else
            {
              self.tableXData=[];
              self.tableBData=[];
              this.$message({
                message: "未查询到分数",
                type: 'error'
              });
            }
          }
        }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
    },
    getBSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '必修学分 ：';
          return;
        }
        else if (index === 2) {
          sums[index] = '应修必修学分 ：';
          return;
        }
        else if (index === 3) {
          sums[index] = '18学分';
          return;
        }
        else{
          const scores = data.map(item => Number(item["score"]));
          scores.forEach((column,index)=>
          {
            if(column>60)
              data[index].pass='1';
          });
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr,index) => {
              const value = Number(curr);
              if (!isNaN(value)&&data[index].pass==='1') {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);

            sums[index] += '学分';
          } else {
            sums[index] = 'N/A';
          }
        }
      });

      return sums;
    },
    getXSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '选修学分 ：';
          return;
        }
        else if (index === 2) {
          sums[index] = '应修选修学分 ：';
          return;
        }
        else if (index === 3) {
          sums[index] = '16学分';
          return;
        }
        else{
          const scores = data.map(item => Number(item["score"]));
          scores.forEach((column,index)=>
          {
            if(column>60)
               data[index].pass='1';
          });
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr,index) => {
              const value = Number(curr);
              if (!isNaN(value)&&data[index].pass==='1') {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '学分';
          } else {
            sums[index] = 'N/A';
          }
        }
      });
      return sums;
    }
  }
};
</script>