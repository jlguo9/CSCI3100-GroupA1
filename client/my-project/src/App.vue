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
          <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-left"></i>
            <span>Toggle Sidebar</span>
          </button>
          <button
            class="btn btn-dark d-inline-block d-lg-none ml-auto"
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
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Register</a>
              </li>
              <!-- <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li> -->
            </ul>
          </div>
        </div>
      </nav>

      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <!-- <canteenMenu id="canteenMenu"></canteenMenu> -->
        <!-- <h1>You are using Foodification!</h1> -->
        <router-view></router-view>


      <!-- <intro id="intro"></intro> -->
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

export default {
  name: "App",
  components: {
    sidebar: sidebar,
     intro:intro,
    canteenMenu: canteenMenu,
    cart:cart,
    record:record
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  color: #01256e;
}
</style>
