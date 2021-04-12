<template>
  <div>
      <div class="container-fluid" id="gallery2">
    <h1>Gallery</h1>
    <h2>Canteens in Chung Chi College</h2>

    <ul class="components">
           <li>
        <router-link to="/gallery2a" tag="li"
          ><a>Café 330</a>
        </router-link>
      </li>
      <li>
        <router-link to="/gallery2b" tag="li"
          ><a>Chung Chi College Staff Club</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery2c" tag="li"
          ><a>Chung Chi College Student Canteen</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery2d" tag="li"
          ><a>Li Wai Chun Building Café</a>
        </router-link>
      </li>

            <li>
        <router-link to="/gallery2e" tag="li"
          ><a>Li Wai Chun Building Halal Food Outlet</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery2f" tag="li"
          ><a>Orchid Lodge</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery2g" tag="li"
          ><a>Pommerenke Student Centre Café (Paper&Coffee)</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery2h" tag="li"
          ><a>Staff Common Room Clubhouse</a>
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
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style>
#gallery2 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery2 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery2 ul li a:visited {
  color: purple;
}
/* 将鼠标悬停在链接上 */
#gallery2 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery2 ul li a:active {
  color: red;
}</style>
