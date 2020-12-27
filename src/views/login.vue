<template>
<div class="login-container">
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
    <h2 class="login-title">管理系统</h2>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
      <el-input v-model="form.passWord"></el-input>
    </el-form-item >
    <el-form-item>
      <el-button type="primary" @click="submit('form')">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      form: {
        userName: 'admin',
        passWord: '123456'
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空！', triggle: 'blur' },
          { min: 3, max: 10, message: '用户名3-10位', triggle: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码不能为空！' , triggle: 'blur' },
          { min:6, max:8 , message: '密码6-8位', triggle: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid =>{
        if(valid) {
          axios.get('/api/login').then(response => {
            const res = response.data.data.userList
            let userNameArr = []
            let passWordArr = []
            // console.log(res.length)
            // console.log(res[0].image)
            for(let i =0; i < res.length; i++) {
              userNameArr.push(res[i].username)
              passWordArr.push(res[i].password)
            }
            // console.log(userNameArr, passWordArr)
            if(userNameArr.indexOf(this.form.userName) === -1) {
              this.$message('该用户名不存在！')
            }else {
              let index = userNameArr.indexOf(this.form.userName)
              if(this.form.passWord === passWordArr[index]) {
                window.sessionStorage.setItem('data', res[index].token)
                window.sessionStorage.setItem('img', res[index].image)
                this.$router.push({path: '/index'})
              }else {
                this.$message('密码错误！')
              }
            }
          })
        }else {
          this.$message('输入错误，请重新输入')
        }
      })
    }
  }
}
</script>
<style>

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: aqua;
}
.login-form {
  position:absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  padding: 17px 30px;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 4%;
}
.login-title {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: normal;
  color: #3c3c3c;
  text-align: center;
}
</style>