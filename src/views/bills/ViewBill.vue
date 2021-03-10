<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="700px"
      color="white"
    >
      <h1 class="card-title">Bill Info</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <div class="costs">
        <v-layout row wrap>
          <v-flex xs12 md12 lg12 class="d-flex justify-center">
            <h1 class="label">Chapati Cost</h1>
            <h1 class="value">Rs. {{ activeBill.chapatiCost }}</h1>
          </v-flex>
          <v-flex xs12 md12 lg12 class="d-flex justify-center">
            <h1 class="label">Salan Cost</h1>
            <h1 class="value">Rs. {{ activeBill.salanCost }}</h1>
          </v-flex>
        </v-layout>
      </div>
      <v-card class="mx-auto mt-10" width="700px" flat>
        <v-data-table
          :headers="headers"
          :items="activeBill.participentsInfo"
          :items-per-page="5"
          class="elevation-2 table"
        ></v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ViewBill',
  computed: {
    ...mapGetters(['activeBill']),
  },
  async created() {
    if (this.$route.params.id) {
      await this.$store.dispatch('getActiveBill', this.$route.params.id);
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Chapati',
          align: 'start',
          sortable: true,
          value: 'chapati',
        },
        {
          text: 'Salan',
          align: 'start',
          sortable: true,
          value: 'salan',
        },
        {
          text: 'Charged',
          align: 'start',
          sortable: true,
          value: 'amount',
        },
      ],
    };
  },
  watch: {
    activeProject: function(activeProject) {
      this.project = activeProject;
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
.costs {
  margin-top: 20px;
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
</style>
