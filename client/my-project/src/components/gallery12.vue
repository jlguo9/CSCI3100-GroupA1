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
                  <select v-model="canteen">
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
                <label>Step 2: Input the New Dish Name:</label>
                <input
                  type="text"
                  class="addingTextBox"
                  v-model="dish"
                  placeholder="Input Here"
                  style="margin:10px;width=300px"
                /><br />

                <input type="file" @change="onFileSelected" />
                <button @click="onUpload" class="btn btn-purple">
                  Upload Now
                </button>
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
      ],
      canteen: '',
      dish: '',
      selectedFile: null,
      myToken: ''
    }
  },
  mounted () {
    this.myToken = localStorage.getItem('token')
    console.log('mounted')
    console.log(this.myToken)
    if (
      this.myToken === '' ||
      this.myToken === null ||
      this.myToken === undefined
    ) {
      window.location.assign('/#login')
      setTimeout('window.location.reload()', 500)
      this.$message.error('Please login first!')
    }
  },
  methods: {
    onFileSelected (event) {
      console.log(event)
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      console.log(this.selectedFile)
      if (
        this.selectedFile === null ||
        this.canteen === '' ||
        this.dish === ''
      ) {
        this.$message.error('Please enter all infomation!')
      } else {
        fd.append('dishImage', this.selectedFile)
        fd.append('canteen', this.canteen)
        fd.append('dish', this.dish)
        // fd.append('name', 'laozi')
        console.log(fd.get('dishImage'))
        this.axios
          .post(
            'http://localhost:3000/api/gallery/add',
            fd, //, canteen: this.canteen, dish: this.dish, name: 'laozi'
            {
              headers: {
                Authorization: `Basic ${this.myToken}`,
                'Content-Type': `multipart/form-data; boundary=${fd._boundary}`
              }
            }
          )
          .then(res => {
            console.log(res)
            this.$message.success("Successful Upload!")
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style></style>
