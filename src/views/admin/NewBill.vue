<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="400px"
      color="white"
    >
      <h1 class="card-title">Total Expense</h1>
      <hr class="mt-5 mb-10" color="#E0E0E0" />
      <v-card class="mx-auto" width="700px" flat>
        <div class="d-flex justify-end">
          <v-btn
            :disabled="eaters.length === newBill.userBills.length"
            text
            @click="addMember"
          >
            <span>Add Member</span>
            <v-icon dark right>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-form class="ml-10 mr-10 form" v-model="isValid">
          <label for="members">Members</label>
          <v-row v-for="(eater, index) in newBill.userBills" :key="index" dense>
            <v-col cols="12" sm="12" md="5" lg="5">
              <v-select
                :change="disableSelected(eater.userId)"
                v-model="eater.userId"
                placeholder="Name"
                :items="eaters"
                class="rounded-lg"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col
              class="d-flex justify-start"
              cols="12"
              xs="6"
              sm="4"
              md="2"
              lg="2"
            >
              <v-checkbox
                class="mt-1 ml-5"
                v-model="eater.chapati"
                label="Chapati"
              ></v-checkbox>
            </v-col>
            <v-col
              class="d-flex justify-start"
              cols="12"
              xs="6"
              sm="4"
              md="2"
              lg="2"
            >
              <v-checkbox
                class="mt-1 ml-5"
                v-model="eater.salan"
                label="Salan"
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              xs="6"
              sm="4"
              md="3"
              lg="3"
              v-if="newBill.userBills.length > 1"
            >
              <div class="d-flex justify-end">
                <v-btn text @click="removeMember(index)">
                  <span>Remove</span>
                  <v-icon dark right>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label for="salan">Salan Cost</label>
              <v-text-field
                class="rounded-lg mt-1"
                placeholder="e.g; 1500"
                type="number"
                v-model="newBill.salan"
                :rules="amountRules"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label for="chapati">Chapati Cost</label>
              <v-text-field
                class="rounded-lg mt-1"
                placeholder="e.g; 1500"
                type="number"
                v-model="newBill.chapati"
                :rules="amountRules"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="saveNewBill"
            class="mb-10 mr-2 green lighten-2"
            dark
            depressed
            :disabled="!checkValid()"
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
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NewBill',
  computed: {
    ...mapGetters(['users', 'newBill']),
  },
  async created() {
    await this.$store.dispatch('getUsers');
    this.users.forEach(user => {
      const eater = {
        value: user.id,
        text: user.name,
      };
      this.eaters.push(eater);
    });
  },
  data() {
    return {
      isValid: false,
      amountRules: [v => !!v || 'Amount is required'],
      eaters: [],
    };
  },
  methods: {
    disableSelected(userId) {
      this.eaters.forEach(eater => {
        if (eater.value === userId) {
          eater.disabled = true;
        }
      });
    },
    addMember() {
      this.newBill.userBills.push({
        chapati: false,
        salan: false,
        amount: 0,
      });
    },
    removeMember(index) {
      this.newBill.userBills.splice(index, 1);
    },
    checkValid() {
      var check = true;
      const userBills = this.newBill.userBills;
      if (!this.isValid) return false;
      if (userBills.length < 1) return false;
      userBills.forEach(userBill => {
        if (!userBill.userId) {
          check = false;
          return;
        }
        if (userBill.chapati === true && userBill.salan === true) {
          check = false;
        } else {
          check = true;
          return;
        }
      });
      return check;
    },
    chapatiAndSalanEaters(eaters) {
      var chapatiEaters = 0;
      var salanEaters = 0;
      for (var i = 0; i < eaters.length; i++) {
        if (!eaters[i].chapati) {
          chapatiEaters++;
        }
        if (!eaters[i].salan) {
          salanEaters++;
        }
        eaters[i].amount = 0;
      }
      return { chapatiEaters, salanEaters };
    },
    divideCostOnEaters(payload) {
      const { eaters, chapatiCostPerEater, salanCostPerEater } = payload;
      for (var i = 0; i < eaters.length; i++) {
        if (!eaters[i].chapati) {
          eaters[i].amount = eaters[i].amount + chapatiCostPerEater;
        }
        if (!eaters[i].salan) {
          eaters[i].amount = eaters[i].amount + salanCostPerEater;
        }
      }
      return eaters;
    },
    async saveNewBill() {
      var eaters = this.newBill.userBills;
      const { chapatiEaters, salanEaters } = this.chapatiAndSalanEaters(eaters);
      const chapatiCostPerEater = this.newBill.chapati / chapatiEaters;
      const salanCostPerEater = this.newBill.salan / salanEaters;
      const payload = {
        eaters,
        chapatiCostPerEater,
        salanCostPerEater,
      };
      eaters = this.divideCostOnEaters(payload);
      const newBill = {
        chapatiCost: parseInt(this.newBill.chapati),
        salanCost: parseInt(this.newBill.salan),
        userBills: eaters,
      };
      await this.$store.dispatch('saveNewBill', newBill);
      this.$router.push('/admin/all-bills');
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
</style>
