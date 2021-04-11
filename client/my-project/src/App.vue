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
              <li class="nav-item">
                <a class="nav-link" href="#" style="float:right">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="float:right">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container-fluid">
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
import gallery2 from './components/gallery2.vue'
import forum from './components/forum.vue'

export default {
  name: 'App',
  components: {
    sidebar: sidebar,
    intro: intro,
    canteenMenu: canteenMenu,
    cart: cart,
    record: record,
    gallery1: gallery1,
    gallery2: gallery2,
    forum: forum
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
