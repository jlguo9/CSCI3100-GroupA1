<template>
  <div>
    <div class="container-fluid" id="gallery7">
      <h1>Gallery</h1>
      <h2>Canteens in Lee Woo Sing College</h2>

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
