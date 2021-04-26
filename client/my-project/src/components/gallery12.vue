// MODULE NAME: GALLERY12
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE UPLOAD-PICTURE-TO-GALLERY PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR UPLOADING PICTURES TO GALLERY
//
// STRUCTURE: 
//   (H1) UPLOAD HEADER
//   (DIV) AREA FOR UPLOADING DISH PICTURE, 
//            INCLUDING OPTION-BOX FOR SELECTING CANTEEN, TEXT-BOX FOR INPUTTNG DISH NAME, FILE SELECTING BUTTON AND THE UPLOAD BUTTON. 

<template>
  <div>
    <!-- THIS IS THE UPLOAD HEADER -->
    <div>
      <h1>
        Gallery:
      </h1>
      <h2>Upload:</h2>
    </div>
    <!-- THIS IS A LINE -->
    <div class="line"></div>
    <!-- THIS IS THE MAIN AREA FOR UPLOADING DISH PICTURE -->
    <div class="container justify-content-center">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div>
            <div class="card card-body">
              <div class="add">
                <!-- THIS IS THE HEADER -->
                <h1>Upload Your Own Picture of Dish here!</h1>
                <!-- THIS IS THE OPTION-BOX FOR SELECTING CANTEEN -->
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
                <!-- THIS IS THE TEXT-BOX FOR INPUTTNG DISH NAME -->
                <label>Step 2: Input the New Dish Name:</label>
                <input
                  type="text"
                  class="addingTextBox"
                  v-model="dish"
                  placeholder="Input Here"
                  style="margin:10px;width=300px"
                /><br />
                <!-- THIS IS THE FILE SELECTING BUTTON -->
                <input type="file" @change="onFileSelected" />
                <!-- THIS IS THE UPLOAD BUTTON -->
                <button @click="onUpload()" class="btn btn-purple">
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
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
     // IF USER DID NOT LOGIN, SHOW ERROR AND REDIRECT TO LOGIN PAGE
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
    // METHOD: ONFILESELECTED
    // PURPOSE: GET THE PHOTO SELECTED
    // INPUT PARAMTER: EVENT OF SELECTING A PHOTO
    // ALGORITHM: 1. STORE THE FILE BY EXTRACTING FROM THE EVENT OF SELECTING A PHOTO
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    // METHOD: ONUPLOAD
    // PURPOSE: UPLOAD THE NEW PHOTO TO GALLERY, INCLUDING CANTEEN NAME, DISH NAME AS WELL AS THE DISH PHOTO 
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER INFORMATION ENTERED IS NOT COMPLETED, IF YES, SHOW ERROR
    //            2. IF NO, STORE CANTEEN NAME, DISH NAME AS WELL AS THE DISH PHOTO IN A FORMDATA FILE,
    //               THEN ASK BACKEND BY SENDING POST COMMAND, THEN SHOWS SUCCESS MESSAGE OR ERROR.
    onUpload () {
      const fd = new FormData()
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
        this.axios
          .post(
            'http://localhost:3000/api/gallery/add',
            fd, 
            {
              headers: {
                Authorization: `Basic ${this.myToken}`,
                'Content-Type': `multipart/form-data; boundary=${fd._boundary}`
              }
            }
          )
          .then(res => {
            this.$message.success('Successful Upload!')
            setTimeout('window.location.reload()', 300)
          })
          .catch(err => {
            this.$message.error('Only image types are supported!')
          })
      }
    }
  }
}
</script>

<style></style>
