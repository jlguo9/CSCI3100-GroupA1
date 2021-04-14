<template>
  <div class="row justify-content-center">
    <div class="login-wrap">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formData"
        class="login-form"
      >
        <h2>CUHK User Login</h2>
        <el-form-item label="Username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <button
          class="btn btn-purple"
          style="width: 100%"
          @click.prevent="login()"
        >
          Login
        </button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      formData: {
        username: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      const {
        data,
        meta: { msg, status }
      } = res
      if (status === 200) {
        console.log('token:' + data.token)
        localStorage.setItem('token', data.token)
        this.$router.push({ name: 'home' })
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    login () {
      if (this.formData.username === '' || this.formData.password === '') {
        this.$message.error('Please enter all information!')
      } else {
        this.axios
          .get(
            'http://localhost:3000/api/user/login?name=' +
              this.formData.username +
              '&password=' +
              this.formData.password
          )
          .then(res => {
            const { status, data } = res
            if (status === 200) {
              this.token = data.Data
              console.log(this.token)
              this.$message.success(
                'Login succeeded! Now redirecting to the home page.'
              )
              window.location.assign('/#home')
              setTimeout('window.location.reload()', 100)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error(
              'Wrong username or password! Please enter again.'
            )
          })
        // this.axios.get('http://localhost:3000/api/user/login').then(res => {
        //   const { status, data } = res
        //   if (status === 200) {
        //     this.token = data.Data
        //     console.log(this.token)
        //   }
        // })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  width: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: solid 3px;
  border-color: #750f6d;
}
.login-wrap .login-form {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
}
</style>
