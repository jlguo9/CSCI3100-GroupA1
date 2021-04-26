// MODULE NAME: GALLERY1G
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-LINK></ROUTER-LINK>
//
// PURPOSE: SEPERATE THE 1G-SUB-GALLERY PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR SHOWING ALL DISH PHOTOS OF WOMEN COOPERATIVE STORE
//
// STRUCTURE: 
//   (H1,BUTTON, H2) GALLERY HEADER AND BUTTON FOR REDIRECTING TO LAST PAGE
//   (LIGHT-GALLERY) FOR DISPLAY THE PHOTO IN LIGHT-GALLERY
//   (UL) LIST OF DISH PHOTOS OF WOMEN COOPERATIVE STORE

<template>
  <div id="gallery1g" class="container-fluid">
    <div>
      <h1>
        Gallery:
        <router-link to="/gallery1"
          ><a class="btn btn-purple" style="color:white;float:right;"
            >Return to Last Page</a
          >
        </router-link>
      </h1>
      <h2>Women Cooperative Store</h2>
    </div>

    <light-gallery
      :images="imageList"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    ></light-gallery>

    <div class="container-fluid" style="padding:0px; margin:0px">
      <ul style="list-style:none; display:inline;float:center">
        <div class="container-fluid" style="padding:0px; margin:0px">
          <li
            v-for="(image, imageIndex) in list"
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
                <img :src="image.Image" style="width:300px" class="thumbnail" />
              </div>
              <h4 style="text-align:center;margin:10px 0px">
                Dish: {{ image.dish }}
              </h4>
              <p style="text-align:center">Author: {{ image.username }}</p>
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
      items: '',
      index: null,
      list: [],
      imageList: []
    }
  },
  mounted () {
    this.getImage()
  },
  methods: {
    getImage () {
      this.axios
        .get('http://localhost:3000/api/gallery/' + 'Women Cooperative Store')
        .then(res => {
          const { status, data } = res
          this.list = data.Data
          this.imageList = data.Data.map(e => e['Image'])
          for (var j = 0; j < this.list.length; j++) {
            this.list[j].Image =
              'http://localhost:3000/api/gallery/' + this.imageList[j]
            this.imageList[j] = this.list[j].Image
          }
          console.log(this.list)
        })
    }
  }
}
</script>

<style></style>
