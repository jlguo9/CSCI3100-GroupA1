// MODULE NAME: GALLERY6
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 6TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE NEW ASIA COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE NEW ASIA COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery6">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in New Asia College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN THE NEW ASIA COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery6a" tag="li"
            ><a>New Asia College Staff Canteen</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery6b" tag="li"
            ><a>New Asia College Student Canteen</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery6c" tag="li"
            ><a>New Asia College Yun Chi Hsien (For members only)</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery6d" tag="li"
            ><a>New Asia College Coffee Shop (Coffee Lover Café)</a>
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
#gallery6 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery6 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery6 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery6 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery6 ul li a:active {
  color: red;
}
</style>
