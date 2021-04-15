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
                      :src="userimages[value.rndID].url"
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
    this.myToken = localStorage.getItem('token')
    console.log('mounted')
    console.log(this.myToken)
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
      console.log('token now is ')
      console.log(this.myToken)
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        window.location.assign('/#login')
        setTimeout('window.location.reload()', 500)
        this.$message.error('Please login first!')
      } else {
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
              for(var j=0; j<this.commentList.length; j++){
                var item =  parseInt(this.commentList[j].userName.charCodeAt(0))%7
                this.commentList[j].rndID = item
              }
              this.commentIDList = data.Data.map(e => e['_id'])
              this.commentdishList = [...new Set(data.Data.map(e => e['dish']))]
              console.log('get succsess')
            }
          })
      }
    },
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
              userName: this.myToken,
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
    likeComment (Likes, id, index) {
      console.log('like success')
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
          console.log(err)
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
