// MODULE NAME: GALLERY11
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 11TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN OTHER PLACES
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN OTHER PLACES

<template>
  <div>
    <div class="container-fluid" id="gallery11">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in Other Places</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN OTHER PLACES -->
      <ul class="components">
        <li>
          <router-link to="/gallery11a" tag="li"><a>The Stage</a> </router-link>
        </li>
        <li>
          <router-link to="/gallery11b" tag="li"
            ><a>Postgraduate Hall 3 Café (Area 39)</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery11c" tag="li"><a>Inno330</a> </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
#gallery11 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery11 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery11 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery11 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery11 ul li a:active {
  color: red;
}
</style>
