<template>
  <div>
    <h1 class="sub-header">
      Your History Record
      <span style="float: right">
        <a class="btn btn-danger" href="/#/record" @click="clearRecord()"
          >Remove All</a
        >
      </span>
    </h1>
    <br />

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
    this.myToken = localStorage.getItem('token')
    console.log('mounted')
    console.log(this.myToken)
    this.getRecord()
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
    },
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
    getRecord () {
      console.log('token now is ')
      console.log(this.myToken)
      if (
        this.myToken === '' ||
        this.myToken === null ||
        this.myToken === undefined
      ) {
        window.location.assign('/#login')
        setTimeout('window.location.reload()', 500)
        this.$message.error('Please login first!')
      } else {
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
    removeFromRecord (index, id) {
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
    clearRecord () {
      if (this.recordIDList.length === 0) {
        this.$message.error('Your history record is already empty.')
        // window.alert('Your history record is already empty.')
      } else {
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
          // window.alert("Removing is done. Please manually refresh this page again.")
          this.getRecord()
        }
      }
    }
  }
}
</script>

<style></style>
