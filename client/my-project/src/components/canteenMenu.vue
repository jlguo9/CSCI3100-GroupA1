<template>
  <div class="container-fluid">
    <h1 class="sub-header">
      Today's Menu
      <span style="float: right">
        <a class="btn btn-danger" href="/#/canteenMenu" @click="clearMenu"
          >Remove All</a
        >
      </span>
    </h1>
    <br />

    <div class="table-responsive">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable3"
      >
        <thead style="background-color: #dda300">
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Canteen Name</th>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Action &nbsp; &nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in searchedList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.id }}</td>
            <td>{{ value.canName }}</td>
            <td>{{ value.dishName }}</td>
            <td>{{ value.dishPrice | formatCurrency }}</td>
            <td>
              <span>
                <a
                  href="#"
                  class="btn btn-success btn-sm"
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
                  class="btn btn-purple btn-sm"
                  href="javascript:window.confirm('Are you sure?')"
                  @click="addToCart(index, id)"
                  >Add to My Cart</a
                >
              </span>
            </td>
          </tr>
          <!-- <tr v-show="menuList.length === 0">
            <td colspan="6">No Dish Data Available.</td>
          </tr> -->
        </tbody>
      </table>
    </div>

    <!-- <div class="line"></div>

    <div class="table-responsive" id="search">
      <h2>
        Search & Filter Menu Here!
        <span style="float: right">
          <a
            class="btn btn-danger"
            href="/#/canteenMenu"
            @click="removeSearchFilter()"
            >Remove Filter Criteria</a
          >
        </span>
      </h2>
      <br />
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>Canteen Name Includes:</td>
            <td>
              <input
                type="text"
                class="searchingTextBox"
                placeholder="Input Search Criteria"
                v-model="searchCanteen"
              />
            </td>
          </tr>
          <tr>
            <td>Dish Name Includes:</td>
            <td>
              <input
                type="text"
                class="searchingTextBox"
                placeholder="Input Search Criteria"
                v-model="searchDish"
              />
            </td>
          </tr>
          <tr>
            <td>Dish Price Range:</td>
            <td>
              <input
                type="number"
                class="smallNumBox"
                step="0.5"
                v-model="searchDishPriceMin"
                placeholder="Input or Click"
                min="0"
              />
              -
              <input
                type="number"
                class="smallNumBox"
                step="0.5"
                v-model="searchDishPriceMax"
                placeholder="Input or Click"
                min="0"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      menuIDList: [],
      searchCanteen: '',
      searchDish: '',
      searchDishPriceMin: 0,
      searchDishPriceMax: 1000
    }
  },
  mounted () {
    this.getMenu()
  },
  filters: {
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
  computed: {
    searchedList () {
      return this.menuList.filter(item => {
        return (
          item.canName
            .toUpperCase()
            .includes(this.searchCanteen.toUpperCase()) &&
          item.dishName.toUpperCase().includes(this.searchDish.toUpperCase()) &&
          item.dishPrice >= parseFloat(this.searchDishPriceMin) &&
          item.dishPrice <= parseFloat(this.searchDishPriceMax)
        )
      })
    }
  },
  methods: {
    getMenu () {
      this.axios.get('http://localhost:3000/menuList').then(res => {
        const { status, data } = res
        if (status === 200) {
          console.log('find')
          this.menuList = data
          console.log(this.menuList)
          this.menuIDList = data.map(e => e['id'])
          this.dishNameList = [...new Set(data.map(e => e['dishName']))]
        }
      })
    },
    deleteItem (index, id) {
      if (confirm('Are you sure?')) {
        this.axios.delete('http://localhost:3000/menuList/' + id).then(res => {
          const { status } = res
          if (status === 200) {
            this.getMenu()
          }
        })
      }
    },
    editItem (index, id) {
      var r1 = window.prompt(
        'Edit the canteen name of this item:',
        'New canteen name'
      )
      var r2 = window.prompt(
        'Edit the dish name of this item:',
        'New dish name'
      )
      var r3 = window.prompt(
        'Edit the dish price of this item:',
        'New dish price'
      )
      if (r1 === null && r2 === null && r3 === null) {
      } else {
        if (r1 === null) {
          r1 = this.searchedList[index].canName
        }
        if (r2 === null) {
          r2 = this.searchedList[index].dishName
        }
        if (r3 === null) {
          r3 = this.searchedList[index].dishPrice
        }
        this.axios
          .put('http://localhost:3000/menuList/' + id, {
            canName: r1,
            dishName: r2,
            dishPrice: r3
          })
          .then(res => {
            const { status } = res
            if (status === 200) {
              this.getMenu()
            }
          })
      }
    },
    addToCart (index, id) {
      this.axios.post('http://localhost:3000/cart', {
        canName: this.searchedList[index].canName,
        dishName: this.searchedList[index].dishName,
        dishPrice: this.searchedList[index].dishPrice,
        quantity: 1
      })
      // .then(res => {
      //   const { status, data } = res
      // })
    },
    clearMenu () {
      if (this.menuIDList.length === 0) {
        window.alert('Menu is already empty.')
      } else {
        if (confirm('Are you sure?')) {
          // console.log(this.menuIDList);
          for (var j = 0; j < this.menuIDList.length; j++) {
            var item = this.menuIDList[j]
            this.axios
              .delete('http://localhost:3000/menuList/' + item)
              .then(res => {
                const { status } = res
                if (status === 200) {
                  this.getMenu()
                }
              })
          }
        }
      }
    },
    removeSearchFilter () {
      this.searchCanteen = ''
      this.searchDish = ''
      this.searchDishPriceMin = 0
      this.searchDishPriceMax = 1000
    }
  }
}
</script>

<style></style>
