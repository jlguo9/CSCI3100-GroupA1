// MODULE NAME: CART
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY href="/#/pay"
//
// PURPOSE: SEPERATE THE PAYMENT PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR PAYING ALL ITEMS IN USER'S CART, AS WELL AS PERFROMING RELEVANT ACTIONS     
//
// STRUCTURE: 
//   (H1) PAYMENT HEADER WITH TOTAL PRICE AND BUTTONS TO TRANFER ITEMS TO RECORD, GO BACK TO CART AND CONTACT ADMIN
//   (LIGHT-GALLERY) FOR DISPLAY THE QR-CORES IN LIGHT-GALLERY
//   (UL) LIST OF QR-CORES FOR PAYMENT

<template>
  <div id="pay" class="container-fluid">
    <!-- THIS IS PAYMENT HEADER WITH TOTAL PRICE AND BUTTONS -->
    <div>
      <h1>
        Pay Now: {{total | formatCurrency}}
        <span style="float: right">
                  <a class="btn btn-success" href="/#/cart" @click="transferToRecord()"
          >I have already paid!</a
        >
        <a class="btn btn-purple" href="/#/cart" 
          >Not sure, go back to my shopping cart</a
        >
        <a class="btn btn-danger" href="mailto:1155107856@link.cuhk.edu.hk?subject = Feedback&body = Message"
          >Error occurs, contact admin now</a
        >
      </span>
      </h1>
    </div>

    <!-- THIS IS VUE-PLUG-IN FOR DISPLAY THE PHOTO IN LIGHT-GALLERY -->
    <light-gallery
      :images="images"
      :index="index"
      :disable-scroll="true"
      @close="index = null"
    ></light-gallery>

    <!-- THIS IS LIST OF QR-CORES FOR PAYMENT -->
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
                <img :src="image.url" style="height:600px;" class="thumbnail" />
              </div>
              <h4 style="text-align:center;margin:10px 0px">
                {{ image.title }}
              </h4>
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
          title: 'WeChat Pay',
          url: require('@/assets/images/wechat.png')
        },
         {
          title: 'AliPay',
          url: require('@/assets/images/alipay.png')
        }
      ],
      items: '',
      index: null,
      imageList: [],
      imageURLList: [],
      imageIDList: [],
      imageTitleList: [],
      cartList: [],
      cartQuantList: [],
      cartIDList: [],
      total: 0,
      myToken: ''
    }
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
    // INVOCATE GET-CART FUNCTION 
    this.getCart()
  },
  filters: {
    // FILTER: FORMATCURRENCY
    // PURPOSE: LET THE NUMBER TO DISPLAY WITH DOLLAR SIGN AND IN TWO DECIMAL POINTS
    // INPUT PARAMTER: ANY VALUE
    // ALGORITHM: 1. TRANSFORM THE INPUT VALUE TO FLOATING VALUE 
    //            2. CHECK WHETHER THE FLOATING VALUE IS NO GREATER THAN 0
    //            3. IF YES, LET IT BE 0. ELSE LET IT BE OF TWO DECIMAL PLACES
    //            4. ADD AN ADDITIONAL DOLLAR SIGN IN THE END
    formatCurrency (v) {
      var revealNum
      if (parseFloat(v) <= 0) {
        revealNum = 0
      } else {
        revealNum = parseFloat(v).toFixed(2)
      }
      return '$ ' + revealNum
    }
  },
  methods: {
    // METHOD: GETCART
    // PURPOSE: GET THE USER'S CART FROM THE DATABASE 
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE USER DID NOT LOGIN, 
    //               IF YES, SHOW ERROR AND REDIRECT TO LOGIN PAGE 
    //            2. IF NO, ASK BACKEND TO GET USER'S CART BY SENDING GET COMMAND, AND STORE IT IN DATA, ALSO CALCULATE TOTAL PRICE
    getCart () {
      // IF USER DID NOT LOGIN, SHOW ERROR AND REDIRECT TO LOGIN PAGE 
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        window.location.assign('/#login')
        setTimeout('window.location.reload()', 500)
        this.$message.error('Please login first!')
      } 
      // ELSE, ASK BACKEND TO GET USER'S CART BY SENDING GET COMMAND, AND STORE IT IN DATA, ALSO CALCULATE TOTAL PRICE
      else {
        this.axios
          .get('http://localhost:3000/api/cart/index', {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status, data } = res
            if (status === 200) {
              this.cartList = data.Data
              $(document).ready(function () {
                $('#mydatatable2').DataTable()
              })
              this.cartQuantList = data.Data.map(e => e['quantity'])
              this.cartIDList = data.Data.map(e => e['_id'])
              this.total = 0
              for (var j = 0; j < this.cartQuantList.length; j++) {
                this.total +=
                  parseFloat(this.cartList[j].price) *
                  parseInt(this.cartList[j].quantity)
              }
            }
          })
      }
    },
    // METHOD: TRANSFERTORECORD
    // PURPOSE: TRANSFER ALL ITEMS IN THE USER'S CART TO USER'S RECORD
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE CART IS EMPTY,
    //               IF YES, SHOW ERROR 
    //            2. IF NO, ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO TRANSFER ALL DISH IN THE CART TO RECORD BY SENDING POST+DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
    //            3. IF SUCCESS, REDIRECT TO CART, REFRESH THE PAGE.
    transferToRecord () {
      // IF CART IS EMPTY, SHOW ERROR
      if (this.cartIDList.length === 0) {
        this.$message.error('Your shopping cart is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO ADD ALL DISHES TO RECORD AND DELETE ALL DISHES IN THE CART BY SENDING POST+DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
      else {
        if (confirm('This will transfer all items in your cart to your record. Are you sure?')) {
          var copyCartIDList = this.cartIDList
          for (var j = copyCartIDList.length - 1; j >= 0; j--) {
            this.axios
              .post(
                'http://localhost:3000/api/record/add',
                {
                  time: new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/'),
                  canteen: this.cartList[j].canteen,
                  name: this.cartList[j].name,
                  price: this.cartList[j].price,
                  subtotal: this.cartList[j].price * this.cartList[j].quantity,
                  quantity: this.cartList[j].quantity
                },
                {
                  headers: {
                    Authorization: `Basic ${this.myToken}`
                  }
                }
              )
              .then(res => {
                this.getCart()
              })
            var item = copyCartIDList[j]
            this.axios
              .delete('http://localhost:3000/api/cart/' + item, {
                headers: {
                  Authorization: `token ${this.myToken}`
                }
              })
              .then(res => {
                const { status } = res
                if (status === 200) {
                  this.getCart()
                }
              })
          }
          this.total = 0
          this.getCart()
          this.$message.success(
            'Transfering is done. Now Redirecting to the cart. Please wait a few secords for your cart to refresh.'
          )
           window.location.assign('/#cart')
          setTimeout('window.location.reload()', 3000)
        }
      }
    }
  }
}
</script>

<style></style>

