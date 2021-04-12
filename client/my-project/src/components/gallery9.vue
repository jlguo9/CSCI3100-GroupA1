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
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
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
