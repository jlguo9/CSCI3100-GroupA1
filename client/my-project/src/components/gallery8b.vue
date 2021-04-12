<template>
  <div id="gallery8b" class="container-fluid">
    <div>
      <h1>
        Gallery:
        <router-link to="/gallery8"
          ><a class="btn btn-purple" style="color:white;float:right;"
            >Return to Last Page</a
          >
        </router-link>
      </h1>
      <h2>Wu Yee Sun College Staff Dining Room</h2>
    </div>
    <light-gallery
      :images="images"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    ></light-gallery>
    <div class="container-fluid" style="padding:0px; margin:0px">
      <ul style="list-style:none; display:inline;float:center">
        <div class="container-fluid" style="padding:0px; margin:0px">
          <li
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
            class="thumb"
            @click="index = imageIndex"
            style="float:left;margin:0px; padding:0px"
          >
            <div style="margin:25px">
              <div
                style="width:300px;height:225px;display: table-cell;
    vertical-align: middle;
    text-align: center;"
              >
                <img :src="image.url" style="width:300px" class="thumbnail" />
              </div>
              <h4 style="text-align:center;margin:10px 0px">
                Dish: {{ image.title }}
              </h4>
              <p style="text-align:center">Author: {{ image.author }}</p>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        {
          title: 'Three Dishes',
          author: 'ABC',
          url: require('@/assets/images/tunnel.jpg')
        },
        {
          title: 'Pic 2',
          author: 'ABC',
          url: require('@/assets/images/park.jpg')
        },
        {
          title: 'Pic 4',
          author: 'ABC',
          url: require('@/assets/images/sky.jpg')
        },
        {
          title: 'Pic 5',
          author: 'ABC',
          url: require('@/assets/images/rails.jpg')
        },
        {
          title: 'Pic 6',
          url: require('@/assets/images/rocks.jpg')
        },
        {
          title: 'Pic 7',
          author: 'ABC',
          url: require('@/assets/images/traffic.jpg')
        },
        {
          title: 'Pic 8',
          author: 'ABC',
          url: require('@/assets/images/bridge.jpg')
        },
        {
          title: 'Frog soak on water',
          author: 'ABC',
          url: require('@/assets/images/coast.jpg')
        },
        {
          title: 'Frog soak on water',
          author: 'ABC',
          url: require('@/assets/images/canteen-2.jpeg')
        }
      ],
      items: '',
      index: null,
      imageList: [],
      imageURLList: [],
      imageIDList: [],
      imageTitleList: [],
      requrl: require('@/assets/images/rails.jpg')
    }
  }

  // mounted () {
  //   this.getImages()
  // },
  // methods: {
  //   onFileSelected (event) {
  //     console.log(event)
  //     this.selectedFile = event.target.files[0]
  //   },
  //   onUpload () {
  //     const fd = new FormData()
  //     fd.append('image', this.selectedFile, this.selectedFile.name)
  //     this.axios.post('http://localhost:3000/gallery2', fd).then(res => {
  //       console.log(res)
  //     })

  //     const formData = new FormData()
  //     Add images to form data
  //     formData.append('bannerImg', this.promo.bannerImg)
  //     formData.append('inAppImg', this.promo.inAppImg)
  //     formData.append('inAppImg', this.promo)

  //     // Add the serialized JSON data to the formData (not
  //     // sure what your JSON object is called)
  //     formData.append('data', JSON.stringify(this.data))

  //     Submit the form data
  //     this.axios
  //       .post('http://localhost:3000/uploadImg', formData)
  //       .then(response => {
  //         console.log('Submit Success')
  //       })
  //       .catch(e => {
  //         console.log('Submit Fail')
  //       })

  //     let formData = new FormData()
  //     formData.append('image', this.selectedFile) // 图片
  //     let params = {
  //       contentId: this.pictureId,
  //       description: this.detailForm.desc
  //     } // 其他数据
  //     formData.append('contentId', params.contentId) // json格式上传
  //     formData.append('description', params.description)

  //     this.axios
  //       .post('http://localhost:3000/uploadImg', formData) // 上传接口
  //       .then(res => {
  //         this.$Message.success('添加成功')
  //         console.log('Submit Success')
  //       })
  //     .catch(err => {
  //       this.$Message.error('添加失败')
  //     })
  //   },
  //   getImages () {
  //     this.axios.get('http://localhost:3000/gallery1').then(res => {
  //       const { status, data } = res
  //       if (status === 200) {
  //         console.log(data)
  //         this.imageList = data
  //         this.imageURLList = data.map(e => e['url'])
  //         // this.requrl[0] = require(this.imageURLList[0]);
  //         this.imageIDList = data.map(e => e['id'])
  //         this.imageTitleList = data.map(e => e['title'])
  //         console.log('now is doing get-cart')
  //         console.log(this.imageURLList)
  //         console.log(this.imageIDList)
  //         console.log(this.imageTitleList)
  //         this.$forceUpdate()
  //         console.log('refreshing is done')
  //       }
  //     })
  //   },
  //   getUploadedImages () {
  //     this.axios.get('http://localhost:3000/uploadImg').then(res => {
  //       const { status, data } = res
  //       if (status === 200) {
  //         console.log(data)
  //       }
  //     })
  //   }
  // }
}
</script>

<style></style>
