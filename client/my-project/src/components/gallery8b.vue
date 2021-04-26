// MODULE NAME: GALLERY8B
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-LINK></ROUTER-LINK>
//
// PURPOSE: SEPERATE THE 8B-SUB-GALLERY PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR SHOWING ALL DISH PHOTOS OF WU YEE SUN COLLEGE STAFF DINING ROOM
//
// STRUCTURE: 
//   (H1,BUTTON, H2) GALLERY HEADER AND BUTTON FOR REDIRECTING TO LAST PAGE
//   (LIGHT-GALLERY) FOR DISPLAY THE PHOTO IN LIGHT-GALLERY
//   (UL) LIST OF DISH PHOTOS OF WU YEE SUN COLLEGE STAFF DINING ROOM

<template>
  <div id="gallery8b" class="container-fluid">
    <!-- THIS IS GALLERY HEADER AND BUTTON FOR REDIRECTING TO LAST PAGE -->
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

    <!-- THIS IS VUE-PLUG-IN FOR DISPLAY THE PHOTO IN LIGHT-GALLERY -->
    <light-gallery
      :images="imageList"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    ></light-gallery>

    <!-- THIS IS LIST OF DISH PHOTOS OF WU YEE SUN COLLEGE STAFF DINING ROOM -->
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
  data() {
    return {
      items: "",
      index: null,
      list: [],
      imageList: []
    };
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, INVOCATE GET-IMAGE FUNCTION 
    this.getImage()
  },
  methods: {
    // METHOD: GETIMAGE
    // PURPOSE: GET ALL DISH PHOTOS OF WU YEE SUN COLLEGE STAFF DINING ROOM FROM THE DATABASE  FROM THE DATABASE 
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. ASK BACKEND TO GET DISH PHOTOS OF WU YEE SUN COLLEGE STAFF DINING ROOM FROM THE DATABASE BY SENDING GET COMMAND, AND STORE IT IN DATA
    getImage () {
      this.axios
        .get(
          "http://localhost:3000/api/gallery/" +
            "Wu Yee Sun College Staff Dining Room"
        )
        .then(res => {
          const { status, data } = res;
          this.list = data.Data;
          this.imageList = data.Data.map(e => e["Image"]);
          for (var j = 0; j < this.list.length; j++) {
            this.list[j].Image =
              "http://localhost:3000/api/gallery/" + this.imageList[j];
            this.imageList[j] = this.list[j].Image;
          }
          console.log(this.list);
        });
    }
  }
};
</script>

<style></style>
