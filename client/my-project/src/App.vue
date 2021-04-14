<template>
  <!-- <div id="app"> -->
  <!-- <img src="./assets/logo.png"> -->
  <div class="wrapper">
    <!-- Sidebar  -->
    <sidebar></sidebar>

    <!-- Page Content  -->
    <div id="content">
      <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container-fluid" id="myHeader">
          <button type="button" id="sidebarCollapse" class="btn btn-purple">
            <i class="fas fa-align-left"></i>
            <span>Toggle Sidebar</span>
          </button>
          <!-- <button
            class="btn  d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style="float:right"
          >
            <i class="fas fa-align-justify"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
          <div>
            <ul class="nav navbar-nav ml-auto" style="float:right">
              <li class="nav-item" v-if="myToken === '' || myToken === null">
                <router-link to="login"
                  ><a class="nav-link" style="float:right">Login</a>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="register"
                  v-if="myToken === '' || myToken === null"
                  ><a class="nav-link" style="float:right">Register</a>
                </router-link>
              </li>
              <li>
                <a
                  class="nav-link"
                  v-if="myToken != '' && myToken != null"
                  style="float:right"
                  @click="exit()"
                  >Exit</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="justify-content-center">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
import sidebar from './components/sidebar.vue'
import intro from './components/intro.vue'
import canteenMenu from './components/canteenMenu.vue'
import cart from './components/cart.vue'
import record from './components/record.vue'
import gallery1 from './components/gallery1.vue'
import gallery1a from './components/gallery1a.vue'
import gallery1b from './components/gallery1b.vue'
import gallery1c from './components/gallery1c.vue'
import gallery1d from './components/gallery1d.vue'
import gallery1e from './components/gallery1e.vue'
import gallery1f from './components/gallery1f.vue'
import gallery1g from './components/gallery1g.vue'
import gallery2 from './components/gallery2.vue'
import gallery2a from './components/gallery2a.vue'
import gallery2b from './components/gallery2b.vue'
import gallery2c from './components/gallery2c.vue'
import gallery2d from './components/gallery2d.vue'
import gallery2e from './components/gallery2e.vue'
import gallery2f from './components/gallery2f.vue'
import gallery2g from './components/gallery2g.vue'
import gallery2h from './components/gallery2h.vue'
import gallery3 from './components/gallery3.vue'
import gallery3a from './components/gallery3a.vue'
import gallery3b from './components/gallery3b.vue'
import gallery3c from './components/gallery3c.vue'
import gallery4 from './components/gallery4.vue'
import gallery4a from './components/gallery4a.vue'
import gallery4b from './components/gallery4b.vue'
import gallery5 from './components/gallery5.vue'
import gallery5a from './components/gallery5a.vue'
import gallery5b from './components/gallery5b.vue'
import gallery5c from './components/gallery5c.vue'
import gallery5d from './components/gallery5d.vue'
import gallery6 from './components/gallery6.vue'
import gallery6a from './components/gallery6a.vue'
import gallery6b from './components/gallery6b.vue'
import gallery6c from './components/gallery6c.vue'
import gallery6d from './components/gallery6d.vue'
import gallery7 from './components/gallery7.vue'
import gallery7a from './components/gallery7a.vue'
import gallery7b from './components/gallery7b.vue'
import gallery7c from './components/gallery7c.vue'
import gallery7d from './components/gallery7d.vue'
import gallery8 from './components/gallery8.vue'
import gallery8a from './components/gallery8a.vue'
import gallery8b from './components/gallery8b.vue'
import gallery9 from './components/gallery9.vue'
import gallery9a from './components/gallery9a.vue'
import gallery10 from './components/gallery10.vue'
import gallery10a from './components/gallery10a.vue'
import gallery11 from './components/gallery11.vue'
import gallery11a from './components/gallery11a.vue'
import gallery11b from './components/gallery11b.vue'
import gallery11c from './components/gallery11c.vue'
import forum from './components/forum.vue'
import login from './components/login.vue'
import register from './components/register.vue'

export default {
  data () {
    return {
      myToken: ''
    }
  },
  mounted () {
    this.myToken = localStorage.getItem('token')
    console.log('mounted')
    console.log(this.myToken)
  },
  methods: {
    exit () {
      localStorage.removeItem('token')
      this.myToken = ''
      this.$message.success(
        'You have successfully log out. Now redirecting to the home page'
      )
      window.location.assign('/#')
      setTimeout('window.location.reload()', 1000)
      console.log('clear')
      console.log(localStorage.getItem('token'))
    }
  },
  name: 'App',
  components: {
    sidebar: sidebar,
    intro: intro,
    canteenMenu: canteenMenu,
    cart: cart,
    record: record,
    gallery1: gallery1,
    gallery1a: gallery1a,
    gallery1b: gallery1b,
    gallery1c: gallery1c,
    gallery1d: gallery1d,
    gallery1e: gallery1e,
    gallery1f: gallery1f,
    gallery1g: gallery1g,
    gallery2: gallery2,
    gallery2a: gallery2a,
    gallery2b: gallery2b,
    gallery2c: gallery2c,
    gallery2d: gallery2d,
    gallery2e: gallery2e,
    gallery2f: gallery2f,
    gallery2g: gallery2g,
    gallery2h: gallery2h,
    gallery3: gallery3,
    gallery3a: gallery3a,
    gallery3b: gallery3b,
    gallery3c: gallery3c,
    gallery4: gallery4,
    gallery4a: gallery4a,
    gallery4b: gallery4b,
    gallery5: gallery5,
    gallery5a: gallery5a,
    gallery5b: gallery5b,
    gallery5c: gallery5c,
    gallery5d: gallery5d,
    gallery6: gallery6,
    gallery6a: gallery6a,
    gallery6b: gallery6b,
    gallery6c: gallery6c,
    gallery6d: gallery6d,
    gallery7: gallery7,
    gallery7a: gallery7a,
    gallery7b: gallery7b,
    gallery7c: gallery7c,
    gallery7d: gallery7d,
    gallery8: gallery8,
    gallery8a: gallery8a,
    gallery8b: gallery8b,
    gallery9: gallery9,
    gallery9a: gallery9a,
    gallery10: gallery10,
    gallery10a: gallery10a,
    gallery11: gallery11,
    gallery11a: gallery11a,
    gallery11b: gallery11b,
    gallery11c: gallery11c,
    forum: forum,
    login: login,
    register: register
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
