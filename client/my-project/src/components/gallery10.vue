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
