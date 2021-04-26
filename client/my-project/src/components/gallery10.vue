// MODULE NAME: GALLERY10
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 10TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE CW CHU COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE CW CHU COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery10">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in CW Chu College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN CW CHU COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery10a" tag="li"
            ><a>Canteen of CW Chu College</a>
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
#gallery10 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery10 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery10 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery10 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery10 ul li a:active {
  color: red;
}
</style>
