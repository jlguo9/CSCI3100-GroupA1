
// MODULE NAME: GALLERY9
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 9TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE SHAW COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE SHAW COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery9">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in Shaw College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN THE SHAW COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery9a" tag="li"
            ><a>SeeYou@Shaw (with Café)</a>
          </router-link>
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
#gallery9 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery9 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery9 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery9 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery9 ul li a:active {
  color: red;
}
</style>
