// MODULE NAME: GALLERY7
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 7TH-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE LEE WOO SING COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE LEE WOO SING COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery7">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in Lee Woo Sing College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN THE LEE WOO SING COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery7a" tag="li"
            ><a>Lee Woo Sing College - WS Pavilion</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery7b" tag="li"
            ><a>Lee Woo Sing College - The Harmony</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery7c" tag="li"
            ><a>Lee Woo Sing College - Cafe Tolo</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery7d" tag="li"
            ><a>Lee Woo Sing College - The Green</a>
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
#gallery7 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery7 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery7 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery7 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery7 ul li a:active {
  color: red;
}
</style>
