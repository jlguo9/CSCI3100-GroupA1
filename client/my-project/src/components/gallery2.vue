<template>
  <div>
    <div class="container-fluid" id="gallery2">
      <h1>Gallery</h1>
      <h2>Canteens in Chung Chi College</h2>

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
