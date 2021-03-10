<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="700px"
      color="white"
    >
      <h1 class="card-title">All Bills</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <v-card class="mx-auto mt-10" width="700px" flat>
        <v-data-table
          :headers="headers"
          :items="allBills"
          :items-per-page="5"
          class="elevation-2 table"
          @click:row="goToViewBll"
        ></v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['allBills']),
  },
  async created() {
    await this.$store.dispatch('getAllBills');
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'createdAt',
        },
        {
          text: 'Day',
          align: 'start',
          sortable: true,
          value: 'day',
        },
        {
          text: 'Chapati Cost',
          align: 'start',
          sortable: true,
          value: 'chapatiCost',
        },
        {
          text: 'Salan Cost',
          align: 'start',
          sortable: true,
          value: 'salanCost',
        },
      ],
    };
  },
  methods: {
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
