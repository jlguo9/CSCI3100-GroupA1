<template>
  <div class="container-fluid">
    <h1 class="sub-header">
      Today's Menu
      <span style="float: right">
        <a class="btn btn-danger" href="/#/canteenMenu" @click="clearMenu()"
          >Remove All</a
        >
      </span>
    </h1>
    <br />

    <div class="table-responsive" v-if="menuList.length > 0">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable1"
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
          <tr v-for="(value, index) in menuList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value._id }}</td>
            <td>{{ value.canteen }}</td>
            <td>{{ value.name }}</td>
            <td>{{ value.price | formatCurrency }}</td>
            <td>
              <span>
                <a
                  href="#"
                  class="btn btn-success btn-sm"
                  @click.prevent="editItem(index, value._id)"
                  >Edit</a
                >&nbsp;&nbsp;
                <a
                  class="btn btn-danger btn-sm"
                  href="javascript:window.confirm('Are you sure?')"
                  @click.prevent="deleteItem(index, value._id)"
                  >Delete</a
                >&nbsp;&nbsp;
                <a
                  class="btn btn-purple btn-sm"
                  href="javascript:window.confirm('Are you sure?')"
                  @click="addToCart(index, value._id)"
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

    <div class="table-responsive" v-if="menuList.length === 0">
      <h4>
        Today's Menu has not been updated yet. Please wait for the new menu.
      </h4>
    </div>

    <div class="line"></div>

    <div class="d-flex justify-content-center" v-if="admin === 0">
      <button
        class="btn btn-purple"
        type="button"
        data-toggle="collapse"
        data-target="#collapseNewDish"
        aria-expanded="false"
        aria-controls="collapseNewDish"
      >
        Add New Dish!
      </button>
    </div>
    <br />
    <div class="container justify-content-center">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div class="collapse " id="collapseNewDish">
            <div class="card card-body">
              <div class="add">
                <h1>Add Today's New Dish Here!</h1>
                <label>Step 1: Select A Canteen:</label>

                <span class="box" style="margin:10px">
                  <select v-model="newCanName">
                    <option disabled :value="null">Select A Canteen</option>
                    <option
                      v-for="option in options"
                      :value="option"
                      :key="option"
                    >
                      {{ option }}
                    </option>
                  </select></span
                >
                <br />
                <label>Step 2: Select An Existing Dish:</label>
                <span class="box" style="margin:10px">
                  <select v-model="newDishName">
                    <option disabled :value="null">
                      Select An Existing Dish
                    </option>
                    <option
                      v-for="option in dishNameList"
                      :value="option"
                      :key="option"
                    >
                      {{ option }}
                    </option>
                  </select> </span
                ><br />

                &nbsp; Or Input the New Dish Name:
                <input
                  type="text"
                  v-model="newDishName"
                  placeholder="Input Here"
                  style="margin:10px;width:300px"
                /><br />

                Step 3: Input the New Dish Price:
                <input
                  type="number"
                  class="addingNumBox"
                  step="0.5"
                  v-model="newDishPrice"
                  style="margin:10px;width:200px"
                  placeholder="Input Here or Click the Button"
                  min="0"
                />

                <br />
                <div style="text-align:center">
                  <input
                    type="button"
                    class="btn btn-sm btn-purple"
                    value="Add New Dish Now"
                    style="margin-top:10px"
                    @click="addItem()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      menuIDList: [],
      dishNameList: [],
      searchCanteen: '',
      searchDish: '',
      searchDishPriceMin: 0,
      searchDishPriceMax: 1000,
      newCanName: '',
      newDishName: '',
      newDishPrice: '',
      admin: 0,
      options: [
        'Basic Medical Sciences Building Snack Bar',
        'Benjamin Franklin Centre Coffee Corner',
        'Benjamin Franklin Centre Staff Canteen',
        'Benjamin Franklin Centre Student Canteen',
        'Benjamin Franklin Centre Vegetarian Food Shop',
        'Café 330',
        'Canteen of CW Chu College',
        'Canteen of S.H. Ho College',
        'Connexion, S.H. Ho College Staff Common Room',
        'Chung Chi College Staff Club',
        'Chung Chi College Student Canteen',
        'Lee Shau Kee Building Snack Bar',
        'Lee Woo Sing College - Cafe Tolo',
        'Lee Woo Sing College - The Green',
        'Lee Woo Sing College - The Harmony',
        'Lee Woo Sing College - WS Pavilion',
        'Li Wai Chun Building Café',
        'Li Wai Chun Building Halal Food Outlet',
        'Morningside College Café',
        'Morningside College Dining Hall',
        'New Asia College Coffee Shop (Coffee Lover Café)',
        'New Asia College Staff Canteen',
        'New Asia College Student Canteen',
        'New Asia College Yun Chi Hsien',
        'Orchid Lodge',
        'Pommerenke Student Centre Café (Paper&Coffee)',
        'Postgraduate Hall 3 Café (Area 39)',
        'S.H. Ho College Café',
        'Staff Common Room Clubhouse',
        'SeeYou@Shaw (with Café)',
        'The Stage',
        'United College Si Yuan Amenities Centre',
        'United College Staff Canteen',
        'United College Staff Common Room',
        'United College Student Canteen',
        'Women Cooperative Store',
        'Wu Yee Sun College Staff Dining Room',
        'Wu Yee Sun College Student Canteen'
      ]
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
  computed: {},
  methods: {
    getMenu () {
      this.axios.get('http://localhost:3000/menuList').then(res => {
        const { status, data } = res
        if (status === 200) {
          console.log('find')
          this.menuList = data.Data
          $(document).ready(function () {
            $('#mydatatable1').DataTable()
          })
          console.log(this.menuList)
          this.menuIDList = data.Data.map(e => e['_id'])
          this.dishNameList = [...new Set(data.Data.map(e => e['name']))]
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
          r1 = this.menuList[index].canteen
        }
        if (r2 === null) {
          r2 = this.menuList[index].name
        }
        if (r3 === null) {
          r3 = this.menuList[index].price
        }
        this.axios
          .put('http://localhost:3000/menuList/' + id, {
            canteen: r1,
            name: r2,
            price: r3
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
        canteen: this.menuList[index].canteen,
        name: this.menuList[index].name,
        price: this.menuList[index].price,
        quantity: 1
      })
      // .then(res => {
      //   const { status, data } = res
      // })
    },
    clearMenu () {
      if (this.menuIDList.length === 0) {
        this.$message.error('Menu is already empty.')
        // window.alert('Menu is already empty.')
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
          this.$message.success(
            'Removing is done. Please manually refresh this page again.'
          )
          // window.alert(
          //   'Removing is done. Please manually refresh this page again.'
          // )
          this.getMenu()
        }
      }
    },
    addItem () {
      if (
        this.newCanName === '' ||
        this.newDishName === '' ||
        this.newDishPrice === ''
      ) {
        this.$message.error('Please enter all infomation!')
        // window.alert('Please enter all infomation!')
      } else {
        this.axios
          .post('http://localhost:3000/menuList', {
            canteen: this.newCanName,
            name: this.newDishName,
            price: this.newDishPrice
          })
          .then(res => {
            const { status, data } = res
            if (status === 201) {
              this.getMenu()
            }
          })
        this.newCanName = ''
        this.newDishName = ''
        this.newDishPrice = ''
      }
    }
  }
}
</script>

<style></style>
