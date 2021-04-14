<template>
  <div>
    <div class="container-fluid" id="gallery4">
      <h1>Gallery</h1>
      <h2>Canteens in S.H. Ho College</h2>

      <ul class="components">
        <li>
          <router-link to="/gallery4a" tag="li"
            ><a>Morningside College Dining Hall</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery4b" tag="li"
            ><a>Morningside College Café</a>
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
#gallery4 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery4 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery4 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery4 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery4 ul li a:active {
  color: red;
}
</style>
