<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="400px"
      color="white"
    >
      <h1 class="card-title">Add Balance</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <v-form class="form mx-auto">
        <label for="userId">User</label>
        <v-select
          v-model="userId"
          placeholder="Name"
          :items="allUsers"
          class="rounded-lg"
          outlined
          dense
        ></v-select>
        <label for="amount">Amount</label>
        <v-text-field
          class="rounded-lg mt-1"
          placeholder="e.g; 1500"
          type="number"
          v-model="amount"
          required
          outlined
          dense
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="addBalance"
          class="mb-10 mr-2 green lighten-2"
          dark
          depressed
          >Save</v-btn
        >
        <v-btn
          @click="$router.push('/dashboard')"
          class="mb-10 mr-8 red lighten-1"
          dark
          depressed
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['users']),
  },
  async created() {
    await this.$store.dispatch('getUsers');
    this.users.forEach(user => {
      const participent = {
        value: user.id,
        text: user.name,
      };
      this.allUsers.push(participent);
    });
  },
  data() {
    return {
      allUsers: [],
      userId: '',
      amount: null,
    };
  },
  methods: {
    async addBalance() {
      const userAmount = {
        amount: this.amount,
        id: this.userId,
      };
      await this.$store.dispatch('addBalance', userAmount);
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
.form {
  width: 50%;
}
</style>
