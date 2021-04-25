// MODULE NAME: REGISTER
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE LOGIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO REGISTER.
//          THIS MODULE IS USED FOR NEW USER TO REGISTER THEIR ACCOUNT BY INPUTTING USERNAME AND PASSWORD.     
//
// STRUCTURE: 
//   (H2) REGISTER HEADER
//   (FORM) USERNAME-INPUT
//   (FORM) PASSWORD-INPUT
//   (BUTTON) REGISTER-BUTTON

<template>
  <div class="row justify-content-center">
    <div class=" login-wrap">
      <el-form
        label-position="top"
        label-width="80px"
        :model="formData"
        class="login-form"
      >
        <!-- REGISTER HEADER -->
        <h2>CUHK User Register</h2>
        <!-- FORM FOR INPUTTING USERNAME -->
        <el-form-item label="Username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <!-- FORM FOR INPUTTING PASSWORD -->
        <el-form-item label="Password (No less than 6 characters)">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="(Optional) Upload Your Profile Photo">
          <input type="file" @change="onFileSelected" />
        </el-form-item>

        <!-- REGISTER BUTTON -->
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
        password: '',
      },
      selectedFile: null,
      myToken: ''
    }
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
  },
  methods: {
    onFileSelected (event) {
      console.log(event)
      this.selectedFile = event.target.files[0]
    },
    register () {
      // IF THERE IS ALREADY A TOKEN, ALREADY SIGNED IN, REDIRECT TO HOME PAGE
      if (this.myToken !== '' && this.myToken !== null) {
        this.$message.warning('You have already signed in!')
        window.location.assign('/#')
        setTimeout('window.location.reload()', 100)
      }
      // IF INFORMATION ENTERED IS NOT COMPLETED, SHOW ERROR 
      if (this.formData.username === '' || this.formData.password === '') {
        this.$message.error('Please enter all information!')
      } 
      // IF NEW PASSWORD IS LESS THAN 6, SHOW ERROR 
      else if (this.formData.password.length < 6) {
        this.$message.error(
          'Please enter a password of more than 6 characters!'
        )
      } 
      // ELSE TRY TO REGISTER, BACKEND WILL TEST WHETHER THE REGISTRATION IS SUCCESSFUL OR NOT
      // IF YES, REDIRECT TO LOGIN PAGE, IF NO, SHOW ERROR
      else {
        const fd = new FormData()
        console.log(this.selectedFile)
        fd.append('avatar', this.selectedFile)
        fd.append('name', this.formData.username)
        fd.append('password', this.formData.password)
        console.log(fd.get('avatar'))
        this.axios
          .post(
            'http://localhost:3000/api/user/register',
            fd, //, canteen: this.canteen, dish: this.dish, name: 'laozi'
            {
              headers: {
                'Content-Type': `multipart/form-data; boundary=${fd._boundary}`
              }
            }
          )
          .then(res => {
            this.$message.success(
              'Successful Registration! Now redirecting to the login page.'
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
