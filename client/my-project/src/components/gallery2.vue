// MODULE NAME: GALLERY2
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE 2ND-GALLERY MAIN PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR REDIRECTING USERS TO SUB-GALLERIES IN THE CHUNG CHI COLLEGE
//
// STRUCTURE: 
//   (H1,H2) GALLERY HEADER
//   (UL) LIST OF HYPERLINKS OF SUB-GALLERIES IN THE CHUNG CHI COLLEGE

<template>
  <div>
    <div class="container-fluid" id="gallery2">
      <!-- THIS IS THE GALLERY HEADER -->
      <h1>Gallery</h1>
      <h2>Canteens in Chung Chi College</h2>
      <!-- THIS IS THE LIST OF HYPERLINKS OF SUB-GALLERIES IN THE CHUNG CHI COLLEGE -->
      <ul class="components">
        <li>
          <router-link to="/gallery2a" tag="li"><a>Café 330</a> </router-link>
        </li>
        <li>
          <router-link to="/gallery2b" tag="li"
            ><a>Chung Chi College Staff Club</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2c" tag="li"
            ><a>Chung Chi College Student Canteen</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2d" tag="li"
            ><a>Li Wai Chun Building Café</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2e" tag="li"
            ><a>Li Wai Chun Building Halal Food Outlet</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2f" tag="li"
            ><a>Orchid Lodge</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2g" tag="li"
            ><a>Pommerenke Student Centre Café (Paper&Coffee)</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery2h" tag="li"
            ><a>Staff Common Room Clubhouse</a>
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
#gallery2 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery2 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery2 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery2 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery2 ul li a:active {
  color: red;
}
</style>
