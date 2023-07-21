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
      <el-button style="margin-left: 30px" icon="el-icon-search" circle @click="receiveCourse"></el-button>
    </div>
    <div class="class-table">
      <div class="table-wrapper">
        <div class="tabel-container">
          <table style="table-layout:fixed;word-wrap:break-word;" >
            <thead>
            <tr>
              <th>时间</th>
              <th v-for="(weekNum, weekIndex) in classTableData.courses.length" :key="weekIndex"> {{'周' + digital2Chinese(weekIndex+1, 'week')}}</th
              >
            </tr>
            </thead>

            <tbody>
            <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex" >

              <td>
                <p>{{'第' + digital2Chinese(lessonIndex+1) + "节"}}</p>
                <p class="period">{{ lesson }}</p>
              </td>

              <td style="word-wrap:break-word;" v-for="(course, courseIndex) in classTableData.courses" :key="courseIndex">
                <div v-if="classTableData.contexts[courseIndex][lessonIndex]!=null">
                <el-tooltip :content="classTableData.contexts[courseIndex][lessonIndex]" class="item" effect="dark"  placement="right">
                <div>
                  {{classTableData.courses[courseIndex][lessonIndex]}}
                </div>
                </el-tooltip>
                </div>
                <div v-else>
                  {{classTableData.courses[courseIndex][lessonIndex]}}
                </div>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
var self;
var stu;
var empty=[
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
  ['', '', '', '', '', '', '', '','', '', '', '',''],
];
export default {
  created() {
    self=this;
    stu=JSON.parse(sessionStorage.getItem("user"));
    this.$set(this.StuInfo,'id',stu.id);
  },
  methods:{
    receiveCourse(){
      if(this.StuInfo.selectTime==='')
        this.$message({
          message: '请选择学期',
          type: 'warning'
        });
      else
      {
        axios({
          method:'post',
          url:"http://localhost:8090/student/checkCourse",
          params:{
            term:this.StuInfo.selectTime,
            id:this.StuInfo.id
          }
        }).then((response)=>{
          if(response.code=='200')
          {
            if(response.data!=null)
            {
              self.$set(self.classTableData,'courses',response.data.courses);
              self.$set(self.classTableData,'contexts',response.data.contexts);
            }
            else
            {
              this.$message({
                  message: "未查询到课程",
                  type: 'error'
                });
              self.$set(self.classTableData,'courses',empty);
              self.$set(self.classTableData,'contexts',empty);
            }
          }
        }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
          console.log(error);
        });
      }
    },
    digital2Chinese(num, identifier) {
      const character = ['零','⼀', '⼆', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三'];
      return identifier === 'week' && (num === 0 || num === 7) ? '⽇' : character[num];
    }
  },
  data() {
    return {
      classTableData: {
        lessons: [
          '08:00-08:40',
          '08:50-09:30',
          '09:50-10:30',
          '10:40-11:20',
          '11:30-12:10',

          '13:30-14:10',
          '14:20-15:00',
          '15:20-16:00',
          '16:10-16:50',
          '17:00-17:40',

          '19:00-19:40',
          '19:50-20:30',
          '20:50-21:30'
        ],
        courses: empty,
        contexts: empty
      },
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
        value: '2020-2021学年秋',
        label: '2020-2021学年秋'
      }],
      StuInfo:{
        selectTime:'',
        id:''
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.class-table {
  .table-wrapper {
    width: 80%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    margin: 7px;
    table {
      table-layout: fixed;
      width: 100%;
      thead {
        background-color: #67a1ff;
        th {
          color: #fff;
          line-height: 17px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #eaf2ff;
        td {
          color: #677998;
          //line-height:25px;
        }
      }
      th,
      td {
        width: 60px;
        padding: 12px 2px;
        font-size: 12px;
        text-align: center;
        overflow: auto;
      }
    }
    tr td:first-child {
      color: #333;
      .period {
        font-size: 8px;
      }
    }
  }
}
</style>
<style>
.el-tooltip__popper {
  max-width: 300px;
}

</style>