<template>
  <div id="forum">
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
                      src="https://i.imgur.com/RpzrMR2.jpg"
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
                <!-- this is the transfer section -->
                <!-- <div
                  id="collapse-2"
                  class="bg-light p-2 collapse"
                  data-parent="#myGroup"
                >
                  <div class="d-flex flex-row align-items-start">
<i class="fab fa-facebook border p-3 rounded mr-1"></i
                    >
                    <i class="fab fa-twitter border p-3 rounded mr-1"></i
                    ><i class="fab fa-linkedin border p-3 rounded mr-1"></i
                    ><i class="fab fa-instagram border p-3 rounded mr-1"></i
                    ><i class="fab fa-dribbble border p-3 rounded mr-1"></i>
                    <i class="fab fa-pinterest border p-3 rounded mr-1"></i>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="line"></div>

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
                    class="btn btn-sm btn-purple"
                    value="Post Now"
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
      detail: '',
      username: 'Daddy', // 明天加
      allowLiking: [],
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
  mounted () {
    this.getComment()
  },
  filters: {
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
    getComment () {
      this.axios.get('http://localhost:3000/api/content/index').then(res => {
        const { status, data } = res
        if (status === 200) {
          this.commentList = data.Data
          console.log(this.commentList[1].userName)
          this.commentIDList = data.Data.map(e => e['_id'])
          this.commentdishList = [...new Set(data.Data.map(e => e['dish']))]
          console.log(this.allowLiking.length)
          if (this.allowLiking.length < 1) {
            this.allowLiking = Array(this.commentList.length).fill(1) // to do
          }
        }
      })
    },
    addComment () {
      if (
        this.commentedcanteen === '' ||
        this.commenteddish === '' ||
        this.detail === ''
      ) {
        window.alert('Please enter all information.')
      } else {
        this.axios
          .post('http://localhost:3000/api/content/publish', {
            canteen: this.commentedcanteen,
            dish: this.commenteddish,
            detail: this.detail,
            userName: this.username,
            likeNum: 0,
            date: new Date()
              .toJSON()
              .slice(0, 10)
              .replace(/-/g, '/')
          })
          .then(res => {
            const { status, data } = res
            if (status === 201) {
              window.alert('Successful Comment!')
              this.getComment()
            }
          })
        this.commentedcanteen = ''
        this.commenteddish = ''
        this.detail = ''
      }
    },
    likeComment (Likes, id, index) {
      if (this.allowLiking[index] === 1) {
        this.axios
          .put('http://localhost:3000/api/like' + id, { likeNum: Likes + 1 })
          .then(res => {
            const { status, data } = res
            if (status === 200) {
              this.getComment()
              this.allowLiking[index] = 0
            }
          })
      } else {
        window.alert('You have already liked this comment!')
      }
    }
  }
}
</script>

<style></style>
