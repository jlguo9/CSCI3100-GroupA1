// MODULE NAME: CART
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE CART PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR SHOWING USER'S CART, AS WELL AS PERFROMING RELEVANT ACTIONS WITH DISH IN USER'S CART.     
//
// STRUCTURE: 
//   (H1) CART HEADER, REMOVE-ALL BUTTON AND TRANSFER-ALL-TO-RECORD BUTTON
//   (TABLE WITH DATATABLE) CART TABLE, DISPLAY IF ANY DISHES EXIST IN USER'S CART
//   (H2) CART INFORMATION, DISPLAY IF NO DISH IN USER'S CART EXISTS

<template>
  <div class="container-fluid">
    <!-- THIS IS THE AREA FOR CART HEADER, REMOVE-ALL BUTTON AND TRANSFER-ALL-TO-RECORD BUTTON -->
    <h1 class="sub-header">
      Your Shopping Cart
      <span style="float: right">
        <a class="btn btn-danger" href="/#/cart" @click="clearCart()"
          >Remove All</a
        >&nbsp;
        <a class="btn btn-purple" href="/#/cart" @click="transferToRecord()"
          >Transfer All to Record</a
        >
      </span>
    </h1>
    <br />

    <!-- THIS IS THE AREA FOR CART TABLE, DISPLAY IF ANY DISHES EXIST IN USER'S CART -->
    <div class="table-responsive" v-if="cartList.length > 0">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable2"
      >
        <thead style="background-color: #dda300">
          <tr>
            <th>Index</th>
            <th>Canteen Name</th>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in cartList" :key="index">
            <td>{{ index + 1 }}</td>
            <!--            <td>{{ value._id }}</td>-->
            <td>{{ value.canteen }}</td>
            <td>{{ value.name }}</td>
            <td>{{ value.price | formatCurrency }}</td>
            <td>
              <span>
                <a
                  href="#/cart"
                  v-bind:class="{
                    'btn btn-danger btn-sm': value.quantity <= 1,
                    'btn btn-success btn-sm': value.quantity > 1
                  }"
                  role="button"
                  @click="subCartQuant(index, value._id)"
                  style="width: 30px; height: 30px; color: white"
                  >-</a
                >
                &nbsp;{{ value.quantity }}&nbsp;
                <a
                  href="#/cart"
                  class="btn btn-success btn-sm"
                  @click="addCartQuant(index, value._id)"
                  style="width: 30px; height: 30 px"
                  >+</a
                >
              </span>
            </td>
            <td>
              <a
                class="btn btn-danger btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click.prevent="removeFromCart(index, value._id)"
                >Delete</a
              >
            </td>
          </tr>
          <!-- <tr v-show="cartList.length === 0">
            <td colspan="7">Your shopping cart is empty.</td>
          </tr> -->
        </tbody>
      </table>

      <h4>
        Total price of your shopping cart is {{ total | formatCurrency }}.
      </h4>
    </div>
    
    <!-- THIS IS THE AREA FOR CART INFORMATION, DISPLAY IF NO DISH IN USER'S CART EXISTS -->
    <div class="table-responsive" v-if="cartList.length === 0">
      <h4>Your shopping cart is empty now.</h4>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    //               IF YES, SHOW ERROR AND REDICT TO LOGIN PAGE 
    //            2. IF NO, ASK BACKEND AND GET USER'S CART BY SENDING GET COMMAND, AND STORE IT IN DATA, ALSO CALCULATE TOTAL PRICE
    getCart () {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        window.location.assign('/#login')
        setTimeout('window.location.reload()', 500)
        this.$message.error('Please login first!')
      } 
      // ELSE, ASK BACKEND AND GET USER'S CART BY SENDING GET COMMAND, AND STORE IT IN DATA, ALSO CALCULATE TOTAL PRICE
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
    // METHOD: SUBCARTQUANT
    // PURPOSE: SUB THE QUANTITY OF ONE ITEM IN THE USER'S CART
    // INPUT PARAMTER: (INDEX,ID)
    // ALGORITHM: 1. CHECK WHETHER THE QUANTITY OF THAT ITEM IS BIGGER THAN ONE 
    //               IF YES, ASK BACKEND TO SUB QUANTITY BY ONE BY SENDING PUT COMMAND
    //            2. IF NO, ASK USER TO CONFIRM, 
    //               IF YES ASK BACKEND TO DELETE THAT DISH BY SENDING DELETE COMMAND, THEN INVOCATE GET-CART FUNCTION
    subCartQuant (index, id) {
      // IF QUANTITY BIGGER THAN ONE, IF YES, ASK BACKEND TO SUB QUANTITY BY ONE
      if (this.cartList[index].quantity > 1) {
        this.total -= parseFloat(this.cartList[index].price) * 1
        this.axios
          .put(
            'http://localhost:3000/api/cart/' + id,
            {
              quantity: this.cartList[index].quantity - 1
            },
            {
              headers: {
                Authorization: `token ${this.myToken}`
              }
            }
          )
          .then(res => {
            const { status } = res
            if (status === 200) {
              this.getCart()
            }
          })
      } 
      // ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE THAT DISH, THEN INVOCATE GET-CART FUNCTION
      else {
        if (
          confirm(
            'This action will remove this item from your shopping cart.\nAre you sure?'
          )
        ) {
          this.axios
            .delete('http://localhost:3000/api/cart/' + id, {
              headers: {
                Authorization: `token ${this.myToken}`
              }
            })
            .then(res => {
              const { status } = res
              if (status === 200) {
                this.getCart()
                this.$message.success('Deleting is done.')
                if (this.cartList.length === 1) {
                  setTimeout('window.location.reload()', 3000)
                }
              }
            })
          this.getCart()
        }
      }
    },
    // METHOD: ADDCARTQUANT
    // PURPOSE: ADD THE QUANTITY OF ONE ITEM IN THE USER'S CART
    // INPUT PARAMTER: (INDEX,ID)
    // ALGORITHM: 1.  ASK BACKEND TO ADD QUANTITY BY ONE BY SENDING PUT COMMAND
    addCartQuant (index, id) {
      this.total += parseFloat(this.cartList[index].price) * 1
      this.axios
        .put(
          'http://localhost:3000/api/cart/' + id,
          {
            quantity: this.cartList[index].quantity + 1
          },
          {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          }
        )
        .then(res => {
          const { status } = res
          if (status === 200) {
            this.getCart()
          }
        })
    },
    // METHOD: REMOVEFROMCART
    // PURPOSE: REMOVE A CERTAIN ITEM IN THE USER'S CART
    // INPUT PARAMTER: (INDEX,ID)
    // ALGORITHM: 1. ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO DELETE THAT DISH IN THE CART BY SENDING DELETE COMMAND, THEN INVOCATE GET-CART FUNCTION
    removeFromCart (index, id) {
      //ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE THAT DISH IN THE CART BY SENDING DELETE COMMAND, THEN INVOCATE GET-CART FUNCTION
      if (confirm('Are you sure?')) {
        this.axios
          .delete('http://localhost:3000/api/cart/' + id, {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status } = res
            if (status === 200) {
              this.getCart()
              if (this.cartList.length === 1) {
                location.reload()
              }
            }
          })
        this.$message.success('Deleting is done.')
        this.getCart()
      }
    },
    // METHOD: CLEARCART
    // PURPOSE: REMOVE ALL ITEMS IN THE USER'S CART
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE CART IS EMPTY,
    //               IF YES, SHOW ERROR 
    //            2. IF NO, ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO DELETE ALL DISH IN THE CART BY SENDING DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
    clearCart () {
      // IF CART IS EMPTY, SHOW ERROR
      if (this.cartList.length === 0) {
        this.$message.error('Your shopping cart is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE ALL DISHES IN THE CART BY SENDING DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
      else {
        if (confirm('Are you sure?')) {
          for (var j = 0; j < this.cartIDList.length; j++) {
            var item = this.cartIDList[j]
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
          this.$message.success(
            'Removing is done. Please wait few seconds for this page to refresh.'
          )
          setTimeout('window.location.reload()', 5000)

        }
      }
    },
    // METHOD: TRANSFERTORECORD
    // PURPOSE: TRANSFER ALL ITEMS IN THE USER'S CART TO USER'S RECORD
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE CART IS EMPTY,
    //               IF YES, SHOW ERROR 
    //            2. IF NO, ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO TRANSFER ALL DISH IN THE CART TO RECORD BY SENDING POST+DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
    transferToRecord () {
      // IF CART IS EMPTY, SHOW ERROR
      if (this.cartIDList.length === 0) {
        this.$message.error('Your shopping cart is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO ADD ALL DISHES TO RECORD AND DELETE ALL DISHES IN THE CART BY SENDING POST+DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-CART FUNCTION
      else {
        if (confirm('Are you sure?')) {
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
            'Transfering is done. Please wait few seconds for this page to refresh.'
          )
          setTimeout('window.location.reload()', 5000)
        }
      }
    }
  }
}
</script>

<style></style>
