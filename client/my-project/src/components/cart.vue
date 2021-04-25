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
    // LET THE NUMBER TO DISPLAY WITH DOLLAR SIGN AND IN TWO DECIMAL POINTS
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
      // ELSE, ASK BACKEND AND GET USER'S CART AND STORE IT IN DATA, ALSO CALCULATE TOTAL PRICE
      else {
        this.axios
          .get('http://localhost:3000/api/cart/index', {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status, data } = res
            console.log(status)
            if (status === 200) {
              this.cartList = data.Data
              console.log(data)
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
    subCartQuant (index, id) {
      // IF QUANTITY BIGGER THAN ONE, ASK BACKEND TO SUB QUANTITY BY ONE
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
              console.log(status)
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
    //ASK BACKEND TO ADD QUANTITY BY ONE
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
    removeFromCart (index, id) {
      //ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE THAT DISH IN THE CART, THEN INVOCATE GET-CART FUNCTION
      if (confirm('Are you sure?')) {
        this.axios
          .delete('http://localhost:3000/api/cart/' + id, {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status } = res
            console.log(status)
            if (status === 200) {
              console.log('shit')
              this.getCart()
              console.log(this.cartList.length)
              if (this.cartList.length === 1) {
                location.reload()
              }
            }
          })
        this.$message.success('Deleting is done.')
        this.getCart()
      }
    },
    clearCart () {
      // IF CART IS EMPTY, SHOW ERROR
      if (this.cartList.length === 0) {
        this.$message.error('Your shopping cart is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE ALL DISHES IN THE CART, THEN INVOCATE GET-CART FUNCTION
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
    transferToRecord () {
      // IF CART IS EMPTY, SHOW ERROR
      if (this.cartIDList.length === 0) {
        this.$message.error('Your shopping cart is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO ADD ALL DISHES TO RECORD AND DELETE ALL DISHES IN THE CART, THEN INVOCATE GET-CART FUNCTION
      else {
        if (confirm('Are you sure?')) {
          var copyCartIDList = this.cartIDList
          for (var j = copyCartIDList.length - 1; j >= 0; j--) {
            console.log('below is j')
            console.log(j)
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
                console.log('post succeeds')
                this.getCart()
              })
            var item = copyCartIDList[j]
            console.log('below is id')
            console.log(item)
            console.log('now is deleting the above id')
            this.axios
              .delete('http://localhost:3000/api/cart/' + item, {
                headers: {
                  Authorization: `token ${this.myToken}`
                }
              })
              .then(res => {
                const { status } = res
                if (status === 200) {
                  console.log('delete succeeds')
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
