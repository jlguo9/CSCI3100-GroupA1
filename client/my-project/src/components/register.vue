<template>
  <div class="row justify-content-center">
    <div class=" login-wrap">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formData"
        class="login-form"
      >
        <h2>CUHK User Register</h2>
        <el-form-item label="User Name">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="Password (No less than 6 characters)">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <button
          class="btn btn-purple"
          style="width:100%"
          @click.prevent="register()"
        >
          Register
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
      myToken: ''
    }
  },
  mounted () {
    this.myToken = localStorage.getItem('token')
    console.log('mounted')
    console.log(this.myToken)
  },
  methods: {
    register () {
      if (this.myToken != '' && this.myToken != null) {
        this.$message.warning('You have already signed in!')
        window.location.assign('/#')
        setTimeout('window.location.reload()', 100)
      }
      if (this.formData.username === '' || this.formData.password === '') {
        this.$message.error('Please enter all information!')
      } else if (this.formData.password.length < 6) {
        this.$message.error(
          'Please enter a password of more than 6 characters!'
        )
      } else {
        this.axios
          .post('http://localhost:3000/api/user/register', {
            name: this.formData.username,
            password: this.formData.password
          })
          .then(res => {
            this.$message.success(
              'Register succeeded! Now redirecting to the login page.'
            )
            window.location.assign('/#login')
            setTimeout('window.location.reload()', 100)
          })
          .catch(err => {
            if (err.response.status === 409) {
              this.$message.error(
                'Same Username Already exists! Please use another one.'
              )
            } else {
              this.$message.error('Server connection error!')
            }
          })
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
