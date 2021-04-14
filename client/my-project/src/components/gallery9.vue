<template>
  <div>
    <div class="container-fluid" id="gallery9">
      <h1>Gallery</h1>
      <h2>Canteens in Shaw College</h2>

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
