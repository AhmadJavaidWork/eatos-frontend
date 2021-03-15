<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="700px"
      color="white"
    >
      <h1 class="card-title">All Payments</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <v-card class="mx-auto mt-10" width="700px" flat>
        <v-data-table
          :headers="headers"
          :items="allPayments"
          :items-per-page="5"
          class="elevation-2 table"
          @click:row="goToViewBll"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editBill(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllPayments',
  computed: {
    ...mapGetters(['allPayments']),
  },
  async created() {
    await this.$store.dispatch('getAllPayments');
    console.log(this.allPayments)
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'created_at',
        },
        {
          text: 'Day',
          align: 'start',
          sortable: true,
          value: 'day',
        },
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Amount',
          align: 'start',
          sortable: true,
          value: 'amount',
        },
      ],
    };
  },
  methods: {
    editBill(bill) {
      this.$router.push({ name: 'EditBill', params: { id: bill.id } });
    },
    goToViewBll(e) {
      this.$router.push({
        name: 'ViewBill',
        params: { id: e.id },
      });
    },
  },
};
</script>

<style scoped>
.card-title {
  padding-top: 20px;
  color: #424242;
  font-weight: 400;
  font-size: 30px !important;
  text-align: center;
}
.label {
  display: inline;
  font-size: 25px;
  font-weight: 400;
}
.value {
  display: inline;
  margin-left: 20px;
  font-size: 25px;
  font-weight: 400;
}
.sub-amount {
  color: blue;
}
.positiveAmount {
  color: green;
}
.negativeAmount {
  color: red;
}
.table {
  cursor: pointer;
}
</style>
