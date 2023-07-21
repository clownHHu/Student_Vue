<template>
  <div class="form">
    <div class="title">教务系统</div>
    <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="id">
        <el-input
          v-model="form.id"
          placeholder="账号"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 350px" type="text" @click="initPasswd" >修改密码</el-button>
        <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>

    </el-form>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="32%" center>
      <el-form :model="passwordruleForm" status-icon :rules="passwordrules" ref="passwordruleForm" label-width="100px" >
        <el-form-item label="账号" prop="id" >
          <el-input :disabled="checkflag" v-model.number="passwordruleForm.id" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="oldpasswd">
          <el-input :disabled="checkflag" type="password" v-model="passwordruleForm.oldpasswd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="checkflag"  type="primary" @click="submitPasswordForm('passwordruleForm')">验证密码</el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input :disabled="!checkflag" type="password" v-model="passwordruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input :disabled="!checkflag" type="password" v-model="passwordruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!checkflag" type="primary" @click="submitPasswordForm('passwordruleForm')">提交</el-button>
          <el-button @click="resetPasswordForm(checkflag)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login } from "@/apis";
import axios from "axios";
var self
export default {
  created() {
    self=this
  },
  data() {
    var checkId = (rule, value, callback) => {
      if(this.checkflag){
        callback();
      }
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      else
        callback();
    };
    var validatePass = (rule, value, callback) => {
      if(!this.checkflag){
        callback();
      }
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordruleForm.checkPass !== '') {
          this.$refs.passwordruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateoldPass = (rule, value, callback) => {
      if(this.checkflag){
        callback();
      }
      if (value === '') {
        callback(new Error('请输入密码'));
      }
        callback();

    };
    var validatePass2 = (rule, value, callback) => {
      if(!this.checkflag){
        callback();
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      checkflag:false,
      passwordruleForm: {
        id: '',
        oldpasswd:'',
        pass: '',
        checkPass: ''
      },
      passwordrules: {
        oldpasswd:[
          { validator: validateoldPass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        id: [
          { validator: checkId, trigger: 'blur' }
        ]
      },
      passwordruleFormrules: {
        id: [
          { validator: checkId, trigger: 'blur' }
        ],
        oldpasswd:[
          { validator: validateoldPass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      form: {
        id: "",
        password: "",
      },
      rules: {
        id: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "此项不能为空", trigger: "blur" },
        ],
      },
      loading: false,
      localStore: false,
      dialogFormVisible:false,
    };
  },
  computed: {
    idPlaceholder() {
      return ["学号", "老师编号", "教学秘书编号"][this.form.type - 1];
    },
  },
  methods: {
    initPasswd(){
      this.passwordruleForm={
        id: '',
        oldpasswd:'',
        pass: '',
        checkPass: ''
      }
      this.checkflag=false
      this.dialogFormVisible=true
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.commit("setAuthenLoading", true);
          login({
            ...this.form,
            password:this.form.password,
          })
            .then((res) => {
              this.$notify({
                title: "登陆成功",
                message: res.msg,
                type: "success",
              });

              sessionStorage.clear();
              localStorage.clear();
              if (this.localStore) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("type", res.message);
                localStorage.setItem("user", JSON.stringify(res.data))
                //localStorage.setItem("user", JSON.stringify(res.data.user))
              } else {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("type", res.message);
                sessionStorage.setItem("user", JSON.stringify(res.data));
              }
              this.$router.push({
                name: "welcome",
              });
            })
            .finally(() => {
              this.loading = false;
              this.$store.commit("setAuthenLoading", false);
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.checkflag)
          {
            axios({
              method:'post',
              url:"http://localhost:8090/users/checkPasswd",
              params:{
                id:this.passwordruleForm.id,
                password:this.passwordruleForm.oldpasswd
              }
            }).then((response)=>{
              if(response.code=='200')
              {
                if(response.message=='good')
                {
                  self.$message({
                    message: "密码正确",
                    type: 'success'
                  });
                  self.checkflag=!self.checkflag
                }
                else if(response.message=='bad'){
                  self.$message({
                    message: "密码错误",
                    type: 'error'
                  });
                }
                else if(response.message=='no'){
                  self.$message({
                    message: "账号错误",
                    type: 'error'
                  });
                }
              }
            }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
              console.log(error);
            });

          }
          else {
            axios({
              method:'post',
              url:"http://localhost:8090/users/changePasswd",
              params:{
                id:this.passwordruleForm.id,
                password:this.passwordruleForm.pass
              }
            }).then((response)=>{
              if(response.code=='200')
              {
                if(response.message=='good')
                {
                  self.$message({
                    message: "密码修改成功",
                    type: 'success'
                  });
                  self.checkflag=!self.checkflag
                  self.dialogFormVisible=false
                }
              }
            }).catch(error => { // 请求失败的回调函数，返回的数据会封装一个promise对象
              console.log(error);
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetPasswordForm(flag) {
      if(flag==true){
        this.passwordruleForm.pass=""
        this.passwordruleForm.checkPass=""
      }
      else {
        this.passwordruleForm.id=""
        this.passwordruleForm.oldpasswd=""
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 2em;
  margin-bottom: 1em;
}
.form {
  width: 420px;
  padding: 30px;
  padding-bottom: 15px;
  background-color: #f8f8f8e0;
  border-radius: 12px;
  text-align: center;
  box-shadow: 2px 1px 12px 2px rgba(224, 224, 224, 0.466);
}
.item {
  text-align: left;
  margin-left: 10px;
}
</style>