// MODULE NAME: GALLERY8
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 8TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE WU YEE SUN COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE WU YEE SUN COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery8">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in Wu Yee Sun College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN THE WU YEE SUN COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery8a" tag="li"
            ><a>Wu Yee Sun College Student Canteen</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery8b" tag="li"
            ><a>Wu Yee Sun College Staff Dining Room</a>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style>
#gallery8 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery8 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery8 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery8 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery8 ul li a:active {
  color: red;
}
</style>
