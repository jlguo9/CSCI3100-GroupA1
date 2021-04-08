<template>
  <div>
    <h1 class="sub-header">Today's Menu</h1>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in searchedList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.id }}</td>
            <td>{{ value.canName }}</td>
            <td>{{ value.dishName }}</td>
            <td>{{ value.dishPrice }}</td>
            <td>
              <a href="#"
                class="btn btn-primary btn-sm"
                @click.prevent="editItem(index, value.id)"
                >Edit</a
              >&nbsp;&nbsp;
              <a
                class="btn btn-danger btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click.prevent="deleteItem(index, value.id)"
                >Delete</a
              >&nbsp;&nbsp;
              <a
                class="btn btn-success btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click="addToCart(index,id)"
                >Add to My Cart</a
              >
            </td>
          </tr>
            <tr v-show="menuList.length ===0">
            <td colspan="6">No Dish Data Available.</td>
          </tr>
        </tbody>
      </table>
      <a class="btn btn-danger" href="#" @click="clearMenu">Remove All</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      menuIDList: [],
    };
  },
  mounted() {
    this.getMenu();
  },
  computed: {
        searchedList() {
          // return this.menuList.filter((item) => {
          //   return (
          //     item.canName
          //       .toUpperCase()
          //       .includes(this.searchCanteen.toUpperCase()) &&
          //     item.dishName
          //       .toUpperCase()
          //       .includes(this.searchDish.toUpperCase()) &&
          //     item.dishPrice >= parseFloat(this.searchDishPriceMin) &&
          //     item.dishPrice <= parseFloat(this.searchDishPriceMax)
          //   );
          // });
          return this.menuList
        },
  },
  methods: {
    getMenu() {
      this.axios.get("http://localhost:3000/menuList").then((res) => {
        const { status, data } = res;
        if (status == 200) {
          console.log("find");
          this.menuList = data;
          console.log(this.menuList);
          this.menuIDList = data.map((e) => e["id"]);
          this.dishNameList = [...new Set(data.map((e) => e["dishName"]))];
        }
      });
    },
    deleteItem(index, id) {
      if (confirm("Are you sure?")) {
        this.axios
          .delete("http://localhost:3000/menuList/" + id)
          .then((res) => {
            const { status, data } = res;
            if (status === 200) {
              this.getMenu();
            }
          });
      }
    },
    editItem(index, id) {
      var r1 = window.prompt(
        "Edit the canteen name of this item:",
        "New canteen name"
      );
      var r2 = window.prompt(
        "Edit the dish name of this item:",
        "New dish name"
      );
      var r3 = window.prompt(
        "Edit the dish price of this item:",
        "New dish price"
      );
      if (r1 === null && r2 === null && r3 === null) {
        return;
      } else {
        if (r1 === null) {
          r1 = this.searchedList[index].canName;
        }
        if (r2 === null) {
          r2 = this.searchedList[index].dishName;
        }
        if (r3 === null) {
          r3 = this.searchedList[index].dishPrice;
        }
        this.axios
          .put("http://localhost:3000/menuList/" + id, {
            canName: r1,
            dishName: r2,
            dishPrice: r3,
          })
          .then((res) => {
            const { status, data } = res;
            if (status === 200) {
              this.getMenu();
            }
          });
      }
    },
    addToCart(index, id) {
      this.axios
        .post("http://localhost:3000/cart", {
          canName: this.searchedList[index].canName,
          dishName: this.searchedList[index].dishName,
          dishPrice: this.searchedList[index].dishPrice,
          quantity: 1,
        })
        .then((res) => {
          const { status, data } = res;
        });
    },
      clearMenu() {
          if (confirm("Are you sure?")) {
            // console.log(this.menuIDList);
            for (var j = 0; j < this.menuIDList.length; j++) {
              var item = this.menuIDList[j]
              this.axios.delete("http://localhost:3000/menuList/" + item).then((res) => {
                const { status, data } = res;
                if (status === 200) {
                  this.getMenu();
                }
              });
            }
          }
        },
  },
};
</script>

<style></style>
