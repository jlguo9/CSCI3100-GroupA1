<template>
  <!-- <div id="app"> -->
  <!-- <img src="./assets/logo.png"> -->
  <div class="wrapper">
    <!-- Sidebar  -->
    <sidebar></sidebar>

    <!-- Page Content  -->
    <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button type="button" id="sidebarCollapse" class="btn btn-purple">
            <i class="fas fa-align-left"></i>
            <span>Toggle Sidebar</span>
          </button>
          <button
            class="btn btn-purple d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-align-justify"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
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

      <div class="col-sm-9 col-sm-offset-3 col-md-12 col-md-offset-20 main">
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
import forum from './components/forum.vue'

export default {
  name: 'App',
  components: {
    sidebar: sidebar,
    intro: intro,
    canteenMenu: canteenMenu,
    cart: cart,
    record: record,
    forum: forum
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1,
h2,
h3 {
  font-family: 'PT Serif', serif;
  color: #750f6d;
}
</style>
