<template>
<div>
  <el-table
      :data="tableData"
      border
      style="width: 85%"
      :row-class-name="tableRowClassName">
    <el-table-column
        label="查看培养方案"
        align="center"
        >
    <el-table-column
        fixed
        sortable
        prop="college"
        label="院系"
        :filters="[{text: '信息工程学院', value: '信息工程学院'}, {text: '政法学院', value: '政法学院'},
        {text: '教育学院', value: '教育学院'}, {text: '心理学院', value: '心理学院'},
        {text: '教师教育学院', value: '教师教育学院'}, {text: '文学院', value: '文学院'},
        {text: '数学科学学院', value: '数学科学学院'}]"
        :filter-method="filterHandler"
    >

    </el-table-column>
    <el-table-column
        prop="ccode"
        sortable
        label="学科代码"
    >
    </el-table-column>
    <el-table-column
        prop="cname"
        sortable
        label="学科名称">
    </el-table-column>

    <el-table-column
        label="查看">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-search" @click="handleClick(scope.row)"size="small" round>查看</el-button>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
var stu;
const axios = require('axios');
// import VuePdfEmbed from 'vue-pdf-embed'
export default {
  // components: {
  //   VuePdfEmbed,
  // },
  created() {
    stu=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.StuInfo,'id',stu.id);
    this.$set(this.StuInfo,'college',stu.college);
    this.$set(this.StuInfo,'major',stu.major);
  },
  methods: {
    // loadPdfHandler(e) {
    //   this.currentPage = 1; // 加载的时候先加载第一页
    // },
    handleClick(row) {
      if(row["cname"]===this.StuInfo.major){
            axios.post("http://localhost:8090/student/checkPyfa",this.StuInfo).then((response)=>{
          if(response.code=="200")
          {
            window.open('http://localhost:8090/'+response.data)
          }
        }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
      }
      else
        this.$message({
          message: "非此专业学生",
          type: 'warning'
        });
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    tableRowClassName(row) {
      if(row.row["cname"]===this.StuInfo.major)
        return 'success-row';
      else
        return '';
    }
  },
  data() {
    return {
      StuInfo:{
        id:'',
        college:'',
        major:''
      },
      tableData: [{
        college: '信息工程学院',
        ccode: '0812',
        cname: '计算机科学与技术',
      }, {
        college: '信息工程学院',
        ccode: '0835',
        cname: '软件工程',
      }, {
        college: '信息工程学院',
        ccode: '0854',
        cname: '电子信息',
      },{
        college: '信息工程学院',
        ccode: '081001',
        cname: '通信与信息系统',
      }, {
        college: '信息工程学院',
        ccode: '040102',
        cname: '课程与教学论',
      }, {
        college: '政法学院',
        ccode: '010101',
        cname: '马克思主义哲学',
      }, {
        college: '教育学院',
        ccode: '040101',
        cname: '教育学原理',
      }, {
        college: '心理学院',
        ccode: '040200',
        cname: '心理学',
      }, {
        college: '教师教育学院',
        ccode: '045104',
        cname: '学科教学（数学）',
      }, {
        college: '文学院',
        ccode: '045300',
        cname: '汉语国际教育',
      }, {
        college: '数学科学学院',
        ccode: '070100',
        cname: '数学',
      }, {
        college: '数学科学学院',
        ccode: '025200',
        cname: '应用统计',
      }]
    }
  }
}
</script>
<style>
.el-table .success-row {
  background: #d9e3f5;
}
.pdf {
  width: 100%;
  height: 100%;
}
</style>