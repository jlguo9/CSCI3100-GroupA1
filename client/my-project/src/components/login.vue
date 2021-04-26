// MODULE NAME: LOGIN
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE LOGIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO LOGIN.
//          THIS MODULE IS USED FOR USERS TO LOGGIN THEIR ACCOUNT BY INPUTTING USERNAME AND PASSWORD. 
//
// STRUCTURE: 
//   (H2) LOGIN HEADER
//   (FORM) USERNAME-INPUT
//   (FORM) PASSWORD-INPUT
//   (BUTTON) LOGIN-BUTTON

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
        password: '',
        token: '',
        myToken: ''
      }
    }
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
  },

  methods: {
    // METHOD: LOGIN
    // PURPOSE: LOGIN TO AN EXISTED ACCOUNT
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THERE IS ALREADY A TOKEN, IF YES MEANS ALREADY SIGNED IN, THEN REDIRECT TO HOME PAGE
    //            2. IF NO, CHECK WHETHER INFORMATION ENTERED IS NOT COMPLETED, IF YES, SHOW ERROR
    //            3. IF NO, TRY TO LOGIN BY SENDING GET COMMAND, BACKEND WILL TEST WHETHER THE LOGIN IS SUCCESSFUL OR NOT
    //               IF YES, REDIRECT TO LOGIN PAGE, IF NO, SHOW ERROR
    login () {
      // IF THERE IS ALREADY A TOKEN, MEANS ALREADY SIGNED IN, THEN REDIRECT TO HOME PAGE
      if (this.myToken !== '' && this.myToken !== null) {
        this.$message.warning('You have already signed in! Now redirecting to home page.')
        window.location.assign('/#')
        setTimeout('window.location.reload()', 100)
      }
      // IF INFORMATION ENTERED IS NOT COMPLETED, SHOW ERROR 
      if (this.formData.username === '' || this.formData.password === '') {
        this.$message.error('Please enter all information!')
      } 
      // ELSE TRY TO LOGIN, BACKEND WILL TEST WHETHER THE LOGIN IS SUCCESSFUL OR NOT
      // IF YES, STORE THE TOKEN AND REDIRECT TO HOME PAGE 
      // IF NO, SHOW ERROR
      else {
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
              this.$message.success(
                'Successufully login! Now redirecting to the home page.'
              )
              localStorage.setItem('token', this.token)
              window.location.assign('/#')
              setTimeout('window.location.reload()', 100)
            }
          })
          .catch(err => {
            this.$message.error(
              'Wrong username or password! Please enter again.'
            )
          })
      }
    }
  }
}
</script>

// CSS STYLE FOR THIS MODULE
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
