// MODULE NAME: FORUM
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE FORUM PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO REGISTER.
//          THIS MODULE IS USED FOR USERS TO SHARE THEIR COMMENTS ON CERTAIN DISHES, AS WELL AS INTERACT WITH OTHERS' COMMENTS.     
//
// STRUCTURE: 
//   (UL) COMMENT, INCLUDING USER-PROFILE-PHOTO, USERNAME, COMMENT-TIME, COMMENT-CANTEEN, COMMENT-DISH, COMMENT, NUMBER OF LIKES, SHARE BUTTON
//   (BUTTON) NEW-COMMENT
//   (COLLAPSED AREA) COLLAPSED AREA FOR INPUTTING NEW COMMENT, INCLUDING OPTION BOX FOR SELECTING CANTEEN AND DISH, INPUTTING TEXT BOX FOR INPUTTING COMMENT

<template>
  <div id="forum">
    <!-- THIS IS THE AREA FOR DISPLAYING ALL COMMENTS -->
    <ul style="list-style:none">
      <li v-for="(value, index) in commentList" :key="index">
        <div class="container mt-5">
          <div class="d-flex justify-content-center row">
            <div class="col-md-8">
              <div class="d-flex flex-column comment-section" id="myGroup">
                <div class="bg-white p-2">
                  <div class="d-flex flex-row user-info">
                    <img
                      class="rounded-circle"
                      :src="value.avatar"
                      width="50px"
                      height="50px"
                    />
                    <div class="d-flex flex-column justify-content-start ml-2">
                      <span class="d-block font-weight-bold name">{{
                        value.userName
                      }}</span
                      ><span class="date text-black-50">{{
                        value.createdAt | dateFormat
                      }}</span>
                    </div>
                  </div>
                  <div class="mt-2">
                    <h6 style="color:#750f6d">
                      Comments on <u>{{ value.dish }}</u> from
                      <i>{{ value.canteen }}:</i>
                    </h6>
                    <p class="comment-text">
                      {{ value.detail }}
                    </p>
                  </div>
                </div>
                <!-- this is the like icon  -->
                <div class="bg-white p-2">
                  <div
                    class="d-flex flex-row fs-15"
                    style="margin:-20px 0px 0px -5px"
                  >
                    <div
                      class="like p-2 cursor"
                      @click="likeComment(value.likeNum, value._id, index)"
                    >
                      <i class="far fa-thumbs-up"></i
                      ><span class="ml-1">Like {{ value.likeNum }}</span>
                    </div>
                    <!-- this is the share icon  -->
                    <div
                      class="like p-2 cursor action-collapse"
                      data-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="collapse-2"
                      href="#collapse-2"
                    >
                      <a href="http://twitter.com/share">
                        <i class="fa fa-share"></i
                        ><span class="ml-1">Share</span></a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- THIS IS A LINE -->
    <div class="line"></div>
    <!-- THIS IS THE  BUTTON FOR ADDING NEW COMMENT -->
    <div class="d-flex justify-content-center">
      <button
        class="btn btn-purple"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        New Comment!
      </button>
    </div>
    <br />
    <!-- THIS IS THE COLLAPSED AREA FOR INPUTTING INFORMATION OF NEW COMMENT -->
    <div class="container justify-content-center">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div class="collapse " id="collapseExample">
            <div class="card card-body">
              <div class="add">
                <h1>Leave your comment here!</h1>
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

                <div class="form-group" style="margin-bottom:-20px">
                  <label for="comment"> Step 3: Input Your Comment:</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    id="newComment"
                    v-model="detail"
                    placeholder="Input Here"
                  ></textarea>
                </div>
                <br />
                <div style="text-align:center">
                  <input
                    type="button"
                    value="Post Now"
                    class="btn btn-purple"
                    style="margin-top:10px;float:center"
                    @click="addComment()"
                  />
                </div>
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
      commentList: [],
      commentdishList: [],
      commentedcanteen: '',
      commenteddish: '',
      imageList: [],
      detail: '',
      myToken: '',
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
      userimages: [
        {
          url: require('@/assets/images/tunnel.jpg')
        },
        {
          url: require('@/assets/images/park.jpg')
        },
        {
          url: require('@/assets/images/sky.jpg')
        },
        {
          url: require('@/assets/images/rails.jpg')
        },
        {
          url: require('@/assets/images/rocks.jpg')
        },
        {
          url: require('@/assets/images/bridge.jpg')
        },
        {
          url: require('@/assets/images/traffic.jpg')
        }
      ]
    }
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
    // INVOCATE GET-COMMENT FUNCTION 
    this.getComment()
  },
  filters: {
    // FILTER: DATEFORMAT
    // PURPOSE: LET THE TIMESTAMP TO DISPLAY IN THE FORMAT OF YYYY-MM-DD HH-MM-SS
    // INPUT PARAMTER: DATESTR
    // ALGORITHM: 1. GET CURRENT YYYY, MM, DD, HH, MM, SS
    //            2. ADD 0 WHENEVER POSSIBLE
    //            3. RETURN THE WHOLE STR TOGETHER
    dateFormat (dataStr) {
      var time = new Date(dataStr)
      function timeAdd0 (str) {
        if (str < 10) {
          str = '0' + str
        }
        return str
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        timeAdd0(m) +
        '-' +
        timeAdd0(d) +
        ' ' +
        timeAdd0(h) +
        ':' +
        timeAdd0(mm) +
        ':' +
        timeAdd0(s)
      )
    }
  },
  methods: {
    // METHOD: GETCOMMENT
    // PURPOSE: GET ALL USER'S COMMENTS FROM THE DATABASE, INCLUDING USER-PROFILE-PHOTO, USERNAME, COMMENT-TIME, COMMENT-CANTEEN, COMMENT-DISH, COMMENT, NUMBER OF LIKES, SHARE BUTTON 
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE USER DID NOT LOGIN, 
    //               IF YES, SHOW ERROR AND REDIRECT TO LOGIN PAGE 
    //            2. IF NO, ASK BACKEND TO GET ALL USER'S COMMENTS BY SENDING GET COMMAND, AND STORE IT IN DATA
    getComment () {
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        window.location.assign('/#login')
        setTimeout('window.location.reload()', 500)
        this.$message.error('Please login first!')
      } 
      else {
        this.axios
          .get('http://localhost:3000/api/content/index', {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status, data } = res
            if (status === 200) {
              this.commentList = data.Data
              this.commentIDList = data.Data.map(e => e['_id'])
              this.commentdishList = [...new Set(data.Data.map(e => e['dish']))]
              for(var k=0;k<this.commentList.length;k++){
                this.commentList[k].avatar = 'http://localhost:3000/api/gallery/' + this.commentList[k].avatar
              }
            }
          })
  
      }
    },
    // METHOD: ADDCOMMENT
    // PURPOSE: ADD A NEW COMMENT
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER IF INFORMATION ENTERED IS NOT COMPLETED, IF NOT COMPLETED, SHOW ERROR
    //            2. IF COMPLETED, ASK BACKEND TO ADD THE NEW COMMENT BY SENDING POST COMMAND
    addComment () {
      if (
        this.commentedcanteen === '' ||
        this.commenteddish === '' ||
        this.detail === ''
      ) {
        this.$message.error('Please enter all information.')
      } else {
        this.axios
          .post(
            'http://localhost:3000/api/content/publish',
            {
              canteen: this.commentedcanteen,
              dish: this.commenteddish,
              detail: this.detail,
              likeNum: 0,
              date: new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, '/')
            },
            {
              headers: {
                Authorization: `Basic ${this.myToken}`
              }
            }
          )
          .then(res => {
            const { status } = res
            if (status === 201) {
              this.$message.success('Successful Comment!')
              this.getComment()
            }
          })
        this.commentedcanteen = ''
        this.commenteddish = ''
        this.detail = ''
      }
    },
    // METHOD: LIKECOMMENT
    // PURPOSE: LIKE OR UNLIKE A CERTAIN COMMENT
    // INPUT PARAMTER: (LIKES,ID,INDEX)
    // ALGORITHM: 1. ASK BACKEND TO LIKE THE COMMENT BY SENDING POST COMMAND. 
    //               IF SUCCESSFUL (CAN LIKE), INVOCATE THE GET-COMMENT FUNCTION TO UPDATE THE LIKE NUMBER.
    //               IF UNSUCESSFUL (CAN NOT LIKE, CAN ONLY UNLIKE), ASK BACKEND TO UNLIKE THE COMMENT BY SENDING DELETE COMMAND, THEN INVOCATE THE GET-COMMENT FUNCTION TO UPDATE THE LIKE NUMBER.
    likeComment (Likes, id, index) {
      this.axios
        .post(
          'http://localhost:3000/api/content/like',
          {
            contentID: id
          },
          {
            headers: {
              Authorization: `Basic ${this.myToken}`
            }
          }
        )
        .then(res => {
          this.$message.success('Like Successfully!')
          setTimeout(this.getComment, 300)
        })
        .catch(err => {
          this.axios
            .delete('http://localhost:3000/api/content/like/' + id, {
              headers: {
                Authorization: `token ${this.myToken}`
              }
            })
            .then(res => {
              this.$message.success('Unlike Successfully!')
              setTimeout(this.getComment, 300)
            })
        })
    }
  }
}
</script>

<style></style>
