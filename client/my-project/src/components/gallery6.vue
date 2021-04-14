<template>
  <div>
    <div class="container-fluid" id="gallery6">
      <h1>Gallery</h1>
      <h2>Canteens in New Asia College</h2>

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
