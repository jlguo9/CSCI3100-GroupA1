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
        <el-form-item label="CUHK Student ID/Staff ID">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <button class="btn btn-purple" style="width:100%">Register</button>
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
