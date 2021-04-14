<template>
  <div>
    <div class="container-fluid" id="gallery3">
      <h1>Gallery</h1>
      <h2>Canteens in S.H. Ho College</h2>

      <ul class="components">
        <li>
          <router-link to="/gallery3a" tag="li"
            ><a>Canteen of S.H. Ho College</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery3b" tag="li"
            ><a>Connexion, S.H. Ho College Staff Common Room</a>
          </router-link>
        </li>

        <li>
          <router-link to="/gallery3c" tag="li"
            ><a>S.H. Ho College Café</a>
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
#gallery3 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery3 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery3 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery3 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery3 ul li a:active {
  color: red;
}
</style>
