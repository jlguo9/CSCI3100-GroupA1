<template>
  <div>
    <h1 class="sub-header">
      Your Shopping Cart
      <span style="float: right">
        <a class="btn btn-danger" href="/#/cart" @click="clearCart()"
          >Remove All</a
        >&nbsp;
        <a class="btn btn-primary" href="/#" @click="transferToRecord()"
          >Transfer All to Record</a
        >
      </span>
    </h1>
    <br />
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
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
            <td>{{ value.id }}</td>
            <td>{{ value.canName }}</td>
            <td>{{ value.dishName }}</td>
            <td>{{ value.dishPrice }}</td>
            <td>
              <a
                href="#"
                class="btn btn-success btn-sm"
                role="button"
                @click="subCartQuant(index, value.id)"
                >-</a
              >
              &nbsp;{{ value.quantity }}&nbsp;
              <a
                href="#"
                class="btn btn-primary btn-sm"
                @click="addCartQuant(index, value.id)"
                >+</a
              >
            </td>
            <td>
              <a
                class="btn btn-danger btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click.prevent="removeFromCart(index, value.id)"
                >Delete</a
              >
            </td>
          </tr>
          <tr v-show="cartList.length === 0">
            <td colspan="7">Your shopping cart is empty.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      cartQuantList: [],
      cartIDList: [],
      total: 0,
    };
  },
  mounted() {
    this.getCart();
  },
  computed: {},
  methods: {
    getCart() {
      this.axios.get("http://localhost:3000/cart").then((res) => {
        const { status, data } = res;
        if (status == 200) {
          this.cartList = data;
          this.cartQuantList = data.map((e) => e["quantity"]);
          this.cartIDList = data.map((e) => e["id"]);
          this.total = 0;
          for (var j = 0; j < this.cartQuantList.length; j++) {
            var item = this.cartQuantList[j];
            // if (parseInt(item) <= 1) {
            //   this.operandButtonValid.push(false);
            //   this.operandButtonInvalid.push(true);
            // } else {
            //   this.operandButtonValid.push(true);
            //   this.operandButtonInvalid.push(false);
            // }
            this.total +=
              parseFloat(this.cartList[j].dishPrice) *
              parseInt(this.cartList[j].quantity);
          }
          console.log("now is doing get-cart");
          console.log(this.total);
          console.log(this.cartList);
          console.log(this.cartIDList);
          this.$forceUpdate();
          console.log("refreshing is done");
        }
      });
    },
    subCartQuant(index, id) {
      if (this.cartList[index].quantity > 1) {
        // if (this.cartList[index].quantity > 2) {
        //   this.operandButtonValid[index] = true;
        //   this.operandButtonInvalid[index] = false;
        // } else if (this.cartList[index].quantity <= 2) {
        //   this.operandButtonValid[index] = false;
        //   this.operandButtonInvalid[index] = true;
        // }
        this.total -= parseFloat(this.cartList[index].dishPrice) * 1;
        this.axios
          .put("http://localhost:3000/cart/" + id, {
            canName: this.cartList[index].canName,
            dishName: this.cartList[index].dishName,
            dishPrice: this.cartList[index].dishPrice,
            quantity: this.cartList[index].quantity - 1,
            id: id,
          })
          .then((res) => {
            const { status, data } = res;
            if (status === 200) {
              this.getCart();
            }
          });
      }
    },
    addCartQuant(index, id) {
      this.total += parseFloat(this.cartList[index].dishPrice) * 1;
      this.axios
        .put("http://localhost:3000/cart/" + id, {
          canName: this.cartList[index].canName,
          dishName: this.cartList[index].dishName,
          dishPrice: this.cartList[index].dishPrice,
          quantity: this.cartList[index].quantity + 1,
          id: id,
        })
        .then((res) => {
          const { status, data } = res;
          if (status === 200) {
            this.getCart();
          }
        });
      // this.operandButtonValid[index] = true;
      // this.operandButtonInvalid[index] = false;
    },
    removeFromCart(index, id) {
      if (confirm("Are you sure?")) {
        this.axios.delete("http://localhost:3000/cart/" + id).then((res) => {
          const { status, data } = res;
          if (status === 200) {
            this.getCart();
          }
        });
        // this.operandButtonValid.splice(index, 1);
        // this.operandButtonInvalid.splice(index, 1);
      }
    },
    clearCart() {
      if (this.cartList.length === 0) {
        window.alert("Your shopping cart is already empty.");
      } else {
        if (confirm("Are you sure?")) {
          // console.log(this.menuIDList);
          for (var j = 0; j < this.cartIDList.length; j++) {
            var item = this.cartIDList[j];
            this.axios
              .delete("http://localhost:3000/cart/" + item)
              .then((res) => {
                const { status, data } = res;
                this.getCart();
              });
          }
        }
      }
    },
    transferToRecord() {
      if (this.cartIDList.length === 0) {
        window.alert("Your shopping cart is already empty.");
      } else {
        if (confirm("Are you sure?")) {
          var copyCartIDList = this.cartIDList;
          for (var j = copyCartIDList.length - 1; j >= 0; j--) {
            console.log("below is j");
            console.log(j);
            this.axios
              .post("http://localhost:3000/record", {
                time: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
                canName: this.cartList[j].canName,
                dishName: this.cartList[j].dishName,
                dishPrice: this.cartList[j].dishPrice,
                subtotal:
                  this.cartList[j].dishPrice * this.cartList[j].quantity,
                quantity: this.cartList[j].quantity,
              })
              .then((res) => {
                console.log("post succeeds");
                this.getCart();
              })
              .catch(function (error) {
                console.log("post fails");
                this.getCart();
              });
            var item = copyCartIDList[j];
            console.log("below is id");
            console.log(item);
            console.log("now is deleting the above id");
            this.axios
              .delete("http://localhost:3000/cart/" + item)
              .then((res) => {
                console.log("delete succeeds");
                this.getCart();
              })
              .catch(function (error) {
                console.log("delete fails");
                this.getCart();
              });
          }
          this.getCart();
          this.total = 0;
        }
      }
    },
  },
};
</script>

<style>
</style>