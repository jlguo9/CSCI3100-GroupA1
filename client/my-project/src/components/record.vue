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

    <div class="table-responsive">
      <table
        class="table table-striped table-hover"
        style="text-align: center"
        id="mydatatable"
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
            <td>{{ value.time }}</td>
            <td>{{ value.canName }}</td>
            <td>{{ value.dishName }}</td>
            <td>{{ value.dishPrice | formatCurrency }}</td>
            <td>{{ value.quantity }}</td>
            <td>{{ value.subtotal | formatCurrency }}</td>
            <td>
              <a
                class="btn btn-danger btn-sm"
                href="javascript:window.confirm('Are you sure?')"
                @click.prevent="removeFromRecord(index, value.id)"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      recordList: [],
      recordIDList: []
    }
  },
  mounted () {
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
    }
  },
  methods: {
    getRecord () {
      this.axios.get('http://localhost:3000/record').then(res => {
        const { status, data } = res
        if (status === 200) {
          console.log('find')
          this.recordList = data
          console.log(this.recordList)
          this.recordIDList = data.map(e => e['id'])
        }
      })
    },
    removeFromRecord (index, id) {
      if (confirm('Are you sure?')) {
        this.axios.delete('http://localhost:3000/record/' + id).then(res => {
          const { status } = res
          if (status === 200) {
            this.getRecord()
          }
        })
      }
    },
    clearRecord () {
      if (this.recordIDList.length === 0) {
        window.alert('Your history record is already empty.')
      } else {
        if (confirm('Are you sure?')) {
          for (var j = 0; j < this.recordIDList.length; j++) {
            var item = this.recordIDList[j]
            this.axios
              .delete('http://localhost:3000/record/' + item)
              .then(res => {
                const { status } = res
                if (status === 200) {
                  this.getRecord()
                }
              })
          }
        }
      }
    }
  }
}
</script>

<style></style>
