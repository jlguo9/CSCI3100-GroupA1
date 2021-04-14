<template>
  <div>
    <div>
      <h1>
        Gallery:
      </h1>
      <h2>Upload:</h2>
    </div>

    <div class="line"></div>

    <div class="container justify-content-center">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div>
            <div class="card card-body">
              <div class="add">
                <h1>Upload Your Own Picture of Dish here!</h1>
                <label>Step 1: Select A Canteen:</label>

                <span class="box" style="margin:10px">
                  <select v-model="commentedcanteen">
                    <option disabled :value="null">Select A Canteen</option>
                    <option
                      v-for="option in options"
                      :value="option"
                      :key="option"
                    >
                      {{ option }}
                    </option>
                  </select></span
                >
                <br />
                <label>Step 2: Select An Existing Dish:</label>
                <span class="box">
                  <select v-model="commenteddish">
                    <option disabled :value="null" style="margin:10px">
                      Select An Existing Dish
                    </option>
                    <option
                      v-for="option in commentdishList"
                      :value="option"
                      :key="option"
                    >
                      {{ option }}
                    </option>
                  </select> </span
                ><br />

                &nbsp; Or Input the New Dish Name:
                <input
                  type="text"
                  class="addingTextBox"
                  v-model="commenteddish"
                  placeholder="Input Here"
                  style="margin:10px;width=300px"
                /><br />

                <el-upload
                  style="text-align:center"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                >
                  <br />
                  <el-button
                    size="small"
                    type="primary"
                    class="btn btn-purple"
                    @click="uploadImg()"
                    >Click to Upload Picture</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        'Basic Medical Sciences Building Snack Bar',
        'Benjamin Franklin Centre Coffee Corner',
        'Benjamin Franklin Centre Staff Canteen',
        'Benjamin Franklin Centre Student Canteen',
        'Benjamin Franklin Centre Vegetarian Food Shop',
        'Café 330',
        'Canteen of CW Chu College',
        'Canteen of S.H. Ho College',
        'Connexion, S.H. Ho College Staff Common Room',
        'Chung Chi College Staff Club',
        'Chung Chi College Student Canteen',
        'Lee Shau Kee Building Snack Bar',
        'Lee Woo Sing College - Cafe Tolo',
        'Lee Woo Sing College - The Green',
        'Lee Woo Sing College - The Harmony',
        'Lee Woo Sing College - WS Pavilion',
        'Li Wai Chun Building Café',
        'Li Wai Chun Building Halal Food Outlet',
        'Morningside College Café',
        'Morningside College Dining Hall',
        'New Asia College Coffee Shop (Coffee Lover Café)',
        'New Asia College Staff Canteen',
        'New Asia College Student Canteen',
        'New Asia College Yun Chi Hsien',
        'Orchid Lodge',
        'Pommerenke Student Centre Café (Paper&Coffee)',
        'Postgraduate Hall 3 Café (Area 39)',
        'S.H. Ho College Café',
        'Staff Common Room Clubhouse',
        'SeeYou@Shaw (with Café)',
        'The Stage',
        'United College Si Yuan Amenities Centre',
        'United College Staff Canteen',
        'United College Staff Common Room',
        'United College Student Canteen',
        'Women Cooperative Store',
        'Wu Yee Sun College Staff Dining Room',
        'Wu Yee Sun College Student Canteen'
      ]
    }
  },
  methods: {
    onFileSelected (event) {
      console.log(event)
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      this.axios.post('http://localhost:3000/gallery2', fd).then(res => {
        console.log(res)
      })
    //   const formData = new FormData()
    //   formData.append('bannerImg', this.promo.bannerImg)
    //   formData.append('inAppImg', this.promo.inAppImg)
    //   formData.append('inAppImg', this.promo)

    //   // Add the serialized JSON data to the formData (not
    //   // sure what your JSON object is called)
    //   formData.append('data', JSON.stringify(this.data))

    //   this.axios
    //     .post('http://localhost:3000/uploadImg', formData)
    //     .then(response => {
    //       console.log('Submit Success')
    //     })
    //     .catch(e => {
    //       console.log('Submit Fail')
    //     })

    //   let formData = new FormData()
    //   formData.append('image', this.selectedFile) // 图片
    //   let params = {
    //     contentId: this.pictureId,
    //     description: this.detailForm.desc
    //   } // 其他数据
    //   formData.append('contentId', params.contentId) // json格式上传
    //   formData.append('description', params.description)

    //   this.axios
    //     .post('http://localhost:3000/uploadImg', formData) // 上传接口
    //     .then(res => {
    //       this.$Message.success('添加成功')
    //       console.log('Submit Success')
    //     })
    //   .catch(err => {
    //     this.$Message.error('添加失败')
    //   })
    // },
    }
  }
}
</script>

<style></style>
