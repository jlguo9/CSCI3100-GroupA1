// MODULE NAME: CANTEENMENU
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE MENU PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR SHOWING TODAY'S MENU, AS WELL AS PERFROMING RELEVANT ACTIONS WITH TODAY'S DISHES.     
//
// STRUCTURE: 
//   (H1) MENU HEADER AND REMOVE-ALL BUTTON
//   (TABLE WITH DATATABLE) MENU TABLE, DISPLAY IF ANY DISHES ON MENU EXIST
//   (H2) MENU INFORMATION , DISPLAY IF NO DISH ON MENU EXISTS
//   (BUTTON) ADD NEW DISH BUTTON
//   (COLLAPSED AREA) COLLAPSED AREA FOR INPUTTING NEW DISH, INCLUDING OPTION BOX FOR SELECTING CANTEEN AND DISH, INPUTTING TEXT BOX FOR SELECTING DISH AND PRICE

<template>
  <div class="container-fluid">

    <!-- THIS IS THE AREA FOR MENU HEADER AND REMOVE-ALL BUTTON -->
    <h1 class="sub-header">
      Today's Menu
      <span style="float: right">
        <a class="btn btn-danger" href="/#/canteenMenu" @click="clearMenu()"
          >Remove All</a
        >
      </span>
    </h1>
    <br />
    
    <!-- THIS IS THE AREA FOR MENU TABLE, DISPLAY IF ANY DISHES EXIST -->
    <div class="table-responsive" v-if="menuList.length > 0">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable1"
      >
        <thead style="background-color: #dda300">
          <tr>
            <th>Index</th>
            <th>Canteen Name</th>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Action &nbsp; &nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in menuList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.canteen }}</td>
            <td>{{ value.name }}</td>
            <td>{{ value.price | formatCurrency }}</td>
            <td>
              <span>
                <a
                  href="/#/canteenMenu"
                  class="btn btn-success btn-sm"
                  @click.prevent="editItem(index, value._id)"
                  >Edit</a
                >&nbsp;&nbsp;
                <a
                  class="btn btn-danger btn-sm"
                  href="/#/canteenMenu"
                  @click.prevent="deleteItem(index, value._id)"
                  >Delete</a
                >&nbsp;&nbsp;
                <a
                  class="btn btn-purple btn-sm"
                  href="/#/canteenMenu"
                  @click="addToCart(index, value._id)"
                  >Add to My Cart</a
                >
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- THIS IS THE AREA FOR MENU INFORMATION, DISPLAY IF NO DISH ON MENU EXISTS -->
    <div class="table-responsive" v-if="menuList.length === 0">
      <h4>
        Today's Menu has not been updated yet. Please wait for the new menu.
      </h4>
    </div>

    <!-- THIS IS A EXTRA NEW LINE -->
    <div class="line"></div>

     <!-- THIS IS THE BUTTON FOR ADDING NEW DISH FOR MANAGERS -->
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

    <!-- THIS IS THE COLLAPSED AREA FOR ADDING NEW DISH FOR MANAGERS -->
    <br />
    <div class="container justify-content-center">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div class="collapse " id="collapseNewDish">
            <div class="card card-body">
              <div class="add">
                <!-- THIS IS THE ADDING-NEW-DISH HEADER -->
                <h1>Add Today's New Dish Here!</h1>
                <label>Step 1: Select A Canteen:</label>

                <!-- THIS IS THE OPTION BOX FOR SELECTING CANTEEN -->
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

                <!-- THIS IS THE OPTION BOX FOR SELECTING AN EXISTING DISH  -->
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

                <!-- THIS IS THE INPUTTING TEXT BOX FOR ENTERING NEW DISH  -->
                &nbsp; Or Input the New Dish Name:
                <input
                  type="text"
                  v-model="newDishName"
                  placeholder="Input Here"
                  style="margin:10px;width:300px"
                /><br />

                <!-- THIS IS THE INPUTTING TEXT BOX FOR ENTERING NEW DISH PRICE -->
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
                
                <!-- THIS IS THE BUTTON FOR ENTERING ADDING NEW DISH -->
                <br />
                <div style="text-align:center">
                  <input
                    type="button"
                    class="btn btn btn-purple"
                    value="Post New Dish Now"
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
      manager: 0,
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
      myToken: '',
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
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
    // INVOCATE GET-MENU FUNCTION 
    this.getMenu()
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
    getMenu () {
      // ASK BACKEND AND GET TODAY'S MENU AND STORE IT IN DATA 
      this.axios.get('http://localhost:3000/api/menu/index').then(res => {
        const { status, data } = res
        if (status === 200) {
          this.menuList = data.Data
          $(document).ready(function () {
            $('#mydatatable1').DataTable()
          })
          this.menuIDList = data.Data.map(e => e['_id'])
          this.dishNameList = [...new Set(data.Data.map(e => e['name']))]
        }
      })
    },
    deleteItem (index, id) {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        this.$message.error(
          'This action requires login first! Stay to read menu or click login button to login.'
        )
      } 
      // ASK USER TO CONFIRM DELETING, IF YES, ASK BACKEND AND DELETE THE DISH
      // BACKEND WILL DELETE SUCCESSFULLY IF USER IS MANAGER, OTHERWISE UNSUCCESSFULLY, WITH ERROR
      else {
        if (confirm('Are you sure to delete this dish?')) {
          this.axios
            .delete('http://localhost:3000/api/menu/' + id, {
              headers: {
                Authorization: `token ${this.myToken}`
              }
            })
            .then(res => {
              const { status } = res
              if (status === 200) {
                this.getMenu()
                this.$message.success('Deleting is done.')
                if (this.menuList.length === 1) {
                  setTimeout('window.location.reload()', 500)
                }
              }
            })
            .catch(err => {
              if (err.response.status === 403) {
                this.$message.error('Only manager can use this function.')
              }
            })
          this.getMenu()
        }
      }
    },
    editItem (index, id) {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        this.$message.error(
          'This action requires login first! Stay to read menu or click login button to login.'
        )
      } 
      // ASK USER TO EDIT, IF YES, NEW CANTEENNAME/DISHNAME/DISHPRICE WILL RECORDED, CANCEL TO REMAIN.
      // BACKEND WILL EDIT SUCCESSFULLY IF USER IS MANAGER, OTHERWISE UNSUCCESSFULLY, WITH ERROR
      else {
        var r1 = window.prompt(
          'Edit the canteen name of this dish or click cancel to remain the previous one',
          'New canteen name'
        )
        var r2 = window.prompt(
          'Edit the dish name of this dish or click cancel to remain the previous one',
          'New dish name'
        )
        var r3 = window.prompt(
          'Edit the price of this dish or click cancel to remain the previous one',
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
            .put(
              'http://localhost:3000/api/menu/' + id,
              {
                canteen: r1,
                name: r2,
                price: r3
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
                this.getMenu()
              }
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.$message.error('Only manager can use this function.')
              }
            })
        }
      }
    },
    addToCart (index, id) {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        this.$message.error(
          'This action requires login first! Stay to read menu or click login button to login.'
        )
      }
      // ASK USER TO CONFIRM ADDING TO CART, IF YES, ASK BACKEND AND ADD THE DISH TO USER'S CART
      else {
        if (confirm('Are you sure to add this dish to cart?')) {
          this.axios
            .post(
              'http://localhost:3000/api/cart/add',
              {
                dishID: id,
                canteen: this.menuList[index].canteen,
                name: this.menuList[index].name,
                price: this.menuList[index].price,
                quantity: 1
              },
              {
                headers: {
                  Authorization: `Basic ${this.myToken}`
                }
              }
            )
            .then(res => {
              const { status } = res
              if (status === 201) {
                this.$message.success('Successfully added to cart.')
              }
            })
        }
      }
    },
    /*
      addToCart (index, id) {
      this.axios.get('http://localhost:3000/api/cart/index').then(res => {
        const { status, data } = res
        if (data.Data.dishID === id) {
          if (
            confirm(
              'This dish has already been in your cart. Do you want one more quantity of it?'
            )
          ) {
            this.axios.put('http://localhost:3000/api/cart/' + id, {
              canteen: data.Data.canteen,
              name: data.Data.name,
              price: data.Data.price,
              quantity: data.Data + 1
            })
          }
        } else {
          this.axios.post('http://localhost:3000/api/cart/add', {
            canteen: this.menuList[index].canteen,
            name: this.menuList[index].name,
            price: this.menuList[index].price,
            quantity: 1
          })
        }
      })
      location.reload()
    }, */
    clearMenu () {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        this.$message.error(
          'This action requires login first! Stay to read menu or click login button to login.'
        )
      } 
      // IF MENU IS EMPTY, SHOW ERROR
      // ELSE, ASK USER TO CONFIRM DELETING, IF YES, ASK BACKEND AND DELETE THE DISH
      // BACKEND WILL DELETE SUCCESSFULLY IF USER IS MANAGER, OTHERWISE UNSUCCESSFULLY, WITH ERROR
      else {
        if (this.menuIDList.length === 0) {
          this.$message.error('Menu is already empty.')
        } 
        else {
          if (confirm('Are you sure?')) {
            for (var j = 0; j < this.menuIDList.length; j++) {
              var item = this.menuIDList[j]
              this.axios
                .delete('http://localhost:3000/api/menu/' + item, {
                  headers: {
                    Authorization: `token ${this.myToken}`
                  }
                })
                .then(res => {
                  const { status } = res
                  console.log(status)
                  if (status === 200) {
                    this.manager = 0
                    console.log(this.manager)
                  }
                })
                .catch(err => {
                  if (err.response.status === 403) {
                    this.manager = 1
                  }
                })
            }
            if(this.manager === 1){
              this.$message.error('Only manager can use this function.')
            }
            else{
              this.getMenu()
              this.$message.success(
                'Removing is done. Please wait few seconds for this page to refresh.'
                )
                setTimeout('window.location.reload()', 3000)
            }
          }
        }
      }
    },
    addItem () {
      // IF USER DID NOT LOGIN, SHOW ERROR
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        this.$message.error(
          'This action requires login first! Stay to read menu or click login button to login.'
        )
      } 
      // IF INFORMATION ENTERED IS NOT COMPLETED, SHOW ERROR
      else if (
        this.newCanName === '' ||
        this.newDishName === '' ||
        this.newDishPrice === ''
      ) {
        this.$message.error('Please enter all infomation!')
      }
      // ASK BACKEND AND ADD THE NEW DISH, THEN INVOCATE THE GET-MENU FUNCTION
      else {
        this.axios
          .post(
            'http://localhost:3000/api/menu/add',
            {
              canteen: this.newCanName,
              name: this.newDishName,
              price: this.newDishPrice
            },
            {
              headers: {
                Authorization: `Basic ${this.myToken}`
              }
            }
          )
          .then(res => {
            const { status } = res
            if (status === 201) {
              this.newCanName = ''
              this.newDishName = ''
              this.newDishPrice = ''
              this.$message.success('Adding is done.')
              this.getMenu()
            }
          })
          .catch(err => {
            if (err.response.status === 403) {
              this.$message.error('Only manager can use this function.')
            }
          })
      }
    }
  }
}
</script>

<style></style>
