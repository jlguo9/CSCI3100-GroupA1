<template>
  <div>
    <div class="container-fluid" id="gallery8">
      <h1>Gallery</h1>
      <h2>Canteens in Wu Yee Sun College</h2>

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
