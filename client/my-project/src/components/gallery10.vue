<template>
  <div>
    <div class="container-fluid" id="gallery10">
      <h1>Gallery</h1>
      <h2>Canteens in CW Chu College</h2>

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
