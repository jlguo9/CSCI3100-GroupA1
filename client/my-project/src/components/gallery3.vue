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
    <!-- <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->
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
