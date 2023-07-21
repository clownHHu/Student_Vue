<template>
  <div class="main">
    <div class="sys">教务系统</div>
    <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="$route.path"
        :router="true"
    >
      <el-menu-item :route="{path:shouye.url}":index="shouye.index">
        <i :class="shouye.icon"></i>
        <span slot="title" >{{ shouye.name }}</span>
      </el-menu-item>
      <el-submenu :index="menu.index" v-for="menu in myMenu">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>
      <el-menu-item :index="item.path" :route="{path:item.path}" v-for="item in menu.children">
        <template slot="title">
          <div class="size-submenu">
            <i :class="item.icon"></i>
          <span>{{item.title}}</span>
          </div>
        </template>
      </el-menu-item>
      </el-submenu>
    </el-menu>

    <div class="user">
      <el-popover placement="right-start" trigger="hover">
        <div class="cont" v-if="type == 1">
          <div>
            学号：<strong>{{ user.id }}</strong>
          </div>
          <div>
            姓名：<strong>{{ user.name }}</strong>
          </div>
          <div>
            性别：<strong>{{ user.sex }}</strong>
          </div>
          <div>
            学院：<strong>{{ user.college }}</strong>
          </div>
          <div>
            所在班级：<strong>{{ user.classn }}</strong>
          </div>
          <div class="item" @click="quit">退出登录</div>
        </div>
        <div class="cont" v-else-if="type == 2">
          <div>
            老师编号：<strong>{{ user.id }}</strong>
          </div>
          <div>
            性别：<strong>{{ user.gender == 1 ? "男" : "女" }}</strong>
          </div>
          <div>
            姓名：<strong>{{ user.name }}</strong>
          </div>
          <div class="item" @click="quit">退出登录</div>
        </div>
        <div class="cont" v-else-if="type == 3">
          <div>
            教学秘书编号：<strong>{{ user.id }}</strong>
          </div>
          <div>
            姓名：<strong>{{ user.name }}</strong>
          </div>
          <div class="item" @click="quit">退出登录</div>
        </div>
        <span class="card" slot="reference">
          <el-avatar :size="36" icon="el-icon-user-solid"></el-avatar>
          <span class="name">{{ user.name }}</span>
        </span>
      </el-popover>
    </div>
  </div>
</template>
<script>
// icon:{user.sex}=='男'?'el-icon-s-home':'el-icon-user',
export default {
  data() {
    return {
      shouye: {
        name: "首页",
        url: "/welcome",
        icon: 'el-icon-s-home',
        index: "1"
      },
      menuList: [
         [
           {
           name: 'SysStudent',//对应index
           title: '个人管理\t',
           icon: 'el-icon-user',
           path: '',//router-link跳转路由
           index: "1",
           children:  [
             {
               name: 'JbxxStudent',
               title: '个人基本信息',
               icon: 'el-icon-search',
               path: '/student/checkInfo',
             },
             {
               name: 'XxwhStudent',
               title: '个人信息维护',
               icon: 'el-icon-edit',
               path: '/student/modifyInfo',
             },
           ]
         },
           {
             name: 'PyStudent',//对应index
             title: '培养管理\t',
             icon: 'el-icon-school',
             path: '',//router-link跳转路由
             index: "2",
             children:  [
               {
                 name: 'PyfaStudent',
                 title: '培养方案查看',
                 icon: 'el-icon-search',
                 path: '/student/checkPyfa',
               },
               {
                 name: 'XskbStudent',
                 title: '学生课表查询',
                 icon: 'el-icon-date',
                 path: '/student/checkCourse',
               },
               {
                 name: 'KccjStudent',
                 title: '课程成绩查询',
                 icon: 'el-icon-tickets',
                 path: '/student/checkGrade',
               },
               {
                 name: 'WsxkStudent',
                 title: '学生网上选课',
                 icon: 'el-icon-monitor',
                 path: '/student/selectCourse',
               }
             ]
           },
           {
             name: 'KyStudent',//对应index
             title: '科研管理\t',
             icon: 'el-icon-trophy',
             path: '',//router-link跳转路由
             index: "3",
             children:  [
               {
                 name: 'KccjStudent',
                 title: '科研成果登记',
                 icon: 'el-icon-receiving',
                 path: '/student/registrationAchive',
               },
             ]
           },
         ],
        [
          {
            name: "GrTeacher",
            title:"个人管理\t",
            icon: 'el-icon-user',
            url: "",
            index: "1",
            children:  [
              {
                name: 'JbxxTeacher',
                title: '个人基本信息',
                icon: 'el-icon-search',
                path: '/teacher/checkInfo',
              },
              {
                name: 'XxwhTeacher',
                title: '个人信息维护',
                icon: 'el-icon-edit',
                path: '/teacher/modifyInfo',
              },
            ]
         },
          {
            name: "JxTeacher",
            title: "教学管理\t",
            icon: "el-icon-reading",
            url: "",
            index: "2",
            children: [
              {
                name: 'KcglTeacher',
                title: '课程管理',
                icon: 'el-icon-document-copy',
                path: '/teacher/courseAdmin',
              },
              {
                name: 'CjglTeacher',
                title: '成绩管理',
                icon: 'el-icon-trophy',
                path: '/teacher/gradeAdmin',
              }
            ]
          },
          {
            name: "GzTeacher",
            title: "工作台\t",
            icon: 'el-icon-suitcase',
            url: "",
            index: "3",
            children: [
              {
                name: 'LczxTeacher',
                title: '流程中心',
                icon: 'el-icon-document-checked',
                path: '/teacher/processCenter',
              },
              {
                name: 'QyzyTeacher',
                title: '企业主页',
                icon: 'el-icon-office-building',
                path: '/teacher/enterpriseHomepage',
              }
            ]
          },
        ],
        [
          {
            name: "GlAdmin",
            title: "学院管理\t",
            icon: 'el-icon-school',
            url: "",
            index: "1",
            children: [
              {
                name:'XSGL',
                title: "学生管理",
                icon: 'el-icon-s-custom',
                path: "/secretary/studentAdmin",
              },
              {
                name:'BJGL',
                title: "导师管理",
                icon: 'el-icon-s-opportunity',
                path: "/secretary/relationAdmin",
              },
              {
                name:'BJGL',
                title: "班级管理",
                icon: 'el-icon-office-building',
                path: "/secretary/classAdmin",
              },
            ]
          },
          {
            name: "GlkcAdmin",
            title: "课程管理\t",
            icon: 'el-icon-suitcase',
            url: "",
            index: "2",
            children: [
              {
                name:'XKGL',
                title: "选课管理",
                icon: 'el-icon-notebook-2',
                path: "/secretary/selectAdmin",
              },
            ]
          }
        ],
      ],
    };
  },
  computed: {
    type() {
      return sessionStorage.getItem("type") ?? localStorage.getItem("type");
    },
    myMenu() {
      let type = sessionStorage.getItem("type") ?? localStorage.getItem("type");
      return this.menuList[type - 1];
    },
    user() {
      return JSON.parse(
        sessionStorage.getItem("user") ?? localStorage.getItem("user")
      );
    },
    currentActive(){
      return this.myMenu.find(e=>{
        return e.url == this.$route.path
      }).index
    }
  },
  methods: {
    quit() {
      sessionStorage.clear();
      localStorage.clear();
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.push({
          name: "login",
        });
      }, 400);
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  background: #304156;
}
.sys {
  padding: 16px;
  font-size: 1.2em;
  font-weight: 600;
  color: rgb(240, 242, 245);
  text-align: center;
  margin: 0 auto;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}
.menu {
  border-right: 0;
  width: 180px;
  /deep/.el-menu-item {
    background: #304156;
    &:hover {
      background: #304156da;
    }
  }
  /deep/.el-submenu__title {
    background: #304156da;
  }
  /deep/.el-submenu {
    background: #304156;
    &:hover {
      background: #304156da;
    }
  }
  /deep/.el-menu-item.is-active {
    background: #409eff;
    color: #fff;
  }
  /deep/.el-submenu .el-menu-item {
    min-width: 0;
  }
}
.user {
  margin-top: auto;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  .card {
    display: flex;
    align-items: center;
  }
  .name {
    font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
    color: #dfdfdf;
    margin: 0 8px;
    font-weight: bold;
    font-size: 1.1em;
  }
}
.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:not(:last-child) {
    margin-bottom: 5px;
  }
}
.item {
  transition: all 0.8s;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #178fff;
  }
}
.size-submenu{
  font-size: 12px;
}
</style>