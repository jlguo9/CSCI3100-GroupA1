// MODULE NAME: RECORD
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   CAN BE INVOCATED BY <ROUTER-VIEW></ROUTER-VIEW>
//
// PURPOSE: SEPERATE THE RECORD PAGE FROM OTHER MODULES, MAKE IT MORE EASILY TO DISPLAY.
//          THIS MODULE IS USED FOR SHOWING USER'S RECORD, AS WELL AS PERFROMING RELEVANT ACTIONS WITH THE DISHES IN THE RECORD.     
//
// STRUCTURE: 
//   (H1) RECORD HEADER AND REMOVE-ALL BUTTON
//   (TABLE WITH DATATABLE) RECORD TABLE, DISPLAY IF ANY DISHES IN RECORD EXIST
//   (H2) RECORD INFORMATION , DISPLAY IF NO DISH IN RECORD EXISTS

<template>
  <div>
    <!-- THIS IS THE AREA FOR RECORD HEADER AND  REMOVE-ALL BUTTON-->
    <h1 class="sub-header">
      Your History Record
      <span style="float: right">
        <a class="btn btn-danger" href="/#/record" @click="clearRecord()"
          >Remove All</a
        >
      </span>
    </h1>
    <br />

    <!-- THIS IS THE AREA FOR RECORD TABLE, DISPLAY IF ANY DISHES EXIST IN USER'S RECORD -->
    <div class="table-responsive" v-if="recordList.length > 0">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable3"
      >
        <thead style="background-color: #dda300">
          <tr>
            <th>Date</th>
            <th>Canteen Name</th>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in recordList" :key="index">
            <td>{{ value.createdAt | dateFormat }}</td>
            <td>{{ value.canteen }}</td>
            <td>{{ value.name }}</td>
            <td>{{ value.price | formatCurrency }}</td>
            <td>{{ value.quantity }}</td>
            <td>{{ value.subtotal | formatCurrency }}</td>
            <td>
              <a
                class="btn btn-danger btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click.prevent="removeFromRecord(index, value._id)"
                >Delete</a
              >
            </td>
          </tr>
          <!-- <tr >
            <td colspan="7">Your record history is empty.</td>
          </tr> -->
        </tbody>
      </table>
    </div>

    <!-- THIS IS THE AREA FOR RECORD INFORMATION, DISPLAY IF NO DISH IN USER'S RECORD EXISTS -->
    <div class="table-responsive" v-if="recordList.length === 0">
      <h4>
        Your record is empty now.
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recordList: [],
      recordIDList: [],
      myToken: ''
    }
  },
  mounted () {
    // WHENEVER PAGE IS MOUNTED, TRY TO GET TOKEN STORED IN LOCAL STORAGE
    this.myToken = localStorage.getItem('token')
    // INVOCATE GET-RECORD FUNCTION 
    this.getRecord()
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
    },
    // FILTER: DATEFORMAT
    // PURPOSE: LET THE TIMESTAMP TO DISPLAY IN THE FORMAT OF YYYY-MM-DD HH-MM-SS
    // INPUT PARAMTER: DATESTR
    // ALGORITHM: 1. GET CURRENT YYYY, MM, DD, HH, MM, SS
    //            2. ADD 0 WHENEVER POSSIBLE
    //            3. RETURN THE WHOLE STR TOGETHER
    dateFormat (dataStr) {
      var time = new Date(dataStr)
      function timeAdd0 (str) {
        if (str < 10) {
          str = '0' + str
        }
        return str
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        timeAdd0(m) +
        '-' +
        timeAdd0(d) +
        ' ' +
        timeAdd0(h) +
        ':' +
        timeAdd0(mm) +
        ':' +
        timeAdd0(s)
      )
    }
  },
  methods: {
    // METHOD: GETRECORD
    // PURPOSE: GET THE USER'S RECORD FROM THE DATABASE 
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE USER DID NOT LOGIN, 
    //               IF YES, SHOW ERROR AND REDIRECT TO LOGIN PAGE 
    //            2. IF NO, ASK BACKEND TO GET USER'S RECORD BY SENDING GET COMMAND, AND STORE IT IN DATA
    getRecord () {
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
      // ELSE, ASK BACKEND TO GET USER'S RECORD AND STORE IT IN DATA
      else {
        this.axios
          .get('http://localhost:3000/api/record/index', {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status, data } = res
            if (status === 200) {
              this.recordList = data.Data
              $(document).ready(function () {
                $('#mydatatable3').DataTable()
              })
              this.recordIDList = data.Data.map(e => e['_id'])
            }
          })
      }
    },
    // METHOD: REMOVEFROMRECORD
    // PURPOSE: REMOVE A CERTAIN ITEM IN THE USER'S RECORD
    // INPUT PARAMTER: (INDEX,ID)
    // ALGORITHM: 1. ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO DELETE THAT DISH IN THE RECORD BY SENDING DELETE COMMAND, THEN INVOCATE GET-RECORD FUNCTION
    removeFromRecord (index, id) {
      //ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE THAT DISH IN THE RECORD, THEN INVOCATE GET-RECORD FUNCTION
      if (confirm('Are you sure?')) {
        this.axios
          .delete('http://localhost:3000/api/record/' + id, {
            headers: {
              Authorization: `token ${this.myToken}`
            }
          })
          .then(res => {
            const { status } = res
            if (status === 200) {
              this.getRecord()
              console.log(this.recordList.length)
              if (this.recordList.length === 1) {
                setTimeout('window.location.reload()', 3000)
              }
              this.$message.success('Deleting is done.')
            }
          })
        this.getRecord()
      }
    },
    // METHOD: CLEARRECORD
    // PURPOSE: REMOVE ALL ITEMS IN THE USER'S RECORD
    // INPUT PARAMTER: NONE
    // ALGORITHM: 1. CHECK WHETHER THE RECORD IS EMPTY,
    //               IF YES, SHOW ERROR 
    //            2. IF NO, ASK USER TO CONFIRM
    //               IF YES ASK BACKEND TO DELETE ALL DISH IN THE RECORD BY SENDING DELETE COMMAND USING FOR-LOOP, THEN INVOCATE GET-RECORD FUNCTION
    clearRecord () {
      // IF RECORD IS EMPTY, SHOW ERROR
      if (this.recordIDList.length === 0) {
        this.$message.error('Your history record is already empty.')
      } 
      //ELSE, ASK USER TO CONFIRM, IF YES ASK BACKEND TO DELETE ALL DISHES IN THE RECORD, THEN INVOCATE GET-RECORD FUNCTION
      else {
        if (confirm('Are you sure?')) {
          for (var j = 0; j < this.recordIDList.length; j++) {
            var item = this.recordIDList[j]
            this.axios
              .delete('http://localhost:3000/api/record/' + item, {
                headers: {
                  Authorization: `token ${this.myToken}`
                }
              })
              .then(res => {
                const { status } = res
                if (status === 200) {
                  this.getRecord()
                }
              })
          }
          setTimeout('window.location.reload()', 3000)
          this.$message.success(
            'Removing is done. Please wait few seconds for this page to refresh.'
          )
          this.getRecord()
        }
      }
    }
  }
}
</script>

<style></style>
