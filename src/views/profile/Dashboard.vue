<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="700px"
      color="white"
    >
      <h1 class="card-title">Eatos Summary</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <div>
        <v-layout row wrap>
          <v-flex xs12 md12 lg12 class="d-flex justify-center">
            <h1 class="label">Remaining Amount</h1>
            <h1 class="value">
              Rs.
              <span
                v-bind:class="{
                  positiveAmount: wallet.balance > 0,
                  negativeAmount: wallet.balance < 0,
                  zeroAmount: wallet.balance === 0,
                }"
              >
                {{ wallet.balance }}
              </span>
            </h1>
          </v-flex>
        </v-layout>
      </div>
      <v-card class="mx-auto mt-10" width="700px" flat>
        <v-data-table
          :headers="headers"
          :items="bills"
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
import { NOTIFY } from '@/store/modules/functions';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['wallet', 'bills', 'user']),
  },

  async created() {
    await this.$store.dispatch('getUserWallet');
    await this.$store.dispatch('getUserBills');
    if (this.prevRoute && this.prevRoute.path === '/') {
      const notification = {
        group: 'auth',
        type: 'success',
        duration: 3000,
        title: `Hello ${this.user.name}`,
        text: 'Nice to see you again',
      };
      NOTIFY(notification);
    }
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
          text: 'Cost',
          align: 'start',
          sortable: true,
          value: 'amount',
        },
      ],
      prevRoute: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
  methods: {
    goToViewBll(e) {
      this.$router.push({
        name: 'ViewUserBill',
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
.positiveAmount {
  color: green;
}
.negativeAmount {
  color: red;
}
.zeroAmount {
  color: blue;
}
.table {
  cursor: pointer;
}
</style>
