<template>
  <div>
    <div class="container-fluid" id="gallery11">
      <h1>Gallery</h1>
      <h2>Canteens in Other Places</h2>

      <ul class="components">
        <li>
          <router-link to="/gallery11a" tag="li"><a>The Stage</a> </router-link>
        </li>
        <li>
          <router-link to="/gallery11b" tag="li"
            ><a>Postgraduate Hall 3 Café (Area 39)</a>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery11c" tag="li"><a>Inno330</a> </router-link>
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
#gallery11 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery11 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery11 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery11 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery11 ul li a:active {
  color: red;
}
</style>
