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
          <v-btn text @click="addMember">
            <span>Add Member</span>
            <v-icon dark right>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-form class="ml-10 mr-10 form" v-model="isValid">
          <label for="members">Members</label>
          <v-row
            v-for="(participent, index) in todaysBill.participents"
            :key="index"
            dense
          >
            <v-col cols="12" sm="12" md="5" lg="5">
              <v-select
                :change="disableParticipents(participent.userId)"
                v-model="participent.userId"
                placeholder="Name"
                :items="participents"
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
                v-model="participent.chapati"
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
                v-model="participent.salan"
                label="Salan"
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              xs="6"
              sm="4"
              md="3"
              lg="3"
              v-if="todaysBill.participents.length > 1"
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
                v-model="todaysBill.salan"
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
                v-model="todaysBill.chapati"
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
            @click="saveTodaysBill"
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
  name: 'Bill',
  computed: {
    ...mapGetters(['users', 'todaysBill']),
  },
  async created() {
    await this.$store.dispatch('getUsers');
    this.users.forEach(user => {
      const participent = {
        value: user.id,
        text: user.name,
      };
      this.participents.push(participent);
    });
  },
  data() {
    return {
      isValid: false,
      amountRules: [v => !!v || 'Amount is required'],
      participents: [],
    };
  },
  methods: {
    disableParticipents() {
      this.participents.forEach(participent => {
        var check = false;
        this.todaysBill.participents.forEach(user => {
          if (participent.value === user.userId) {
            check = true;
          }
        });
        if (check) participent.disabled = true;
        else participent.disabled = false;
      });
    },
    addMember() {
      this.todaysBill.participents.push({
        chapati: false,
        salan: false,
        amount: 0,
      });
    },
    removeMember(index) {
      this.todaysBill.participents.splice(index, 1);
    },
    checkValid() {
      var check = true;
      for (var i = 0; i < this.todaysBill.participents.length; i++) {
        if (!this.todaysBill.participents[i].userId) {
          check = false;
          break;
        }
        if (
          this.todaysBill.participents[i].chapati === true &&
          this.todaysBill.participents[i].salan === true
        ) {
          check = false;
          break;
        }
        if (!this.isValid) {
          check = false;
          break;
        }
      }
      return check;
    },
    chapatiAndSalanParticipents(participents) {
      var chapatiParticipents = 0;
      var salanParticipents = 0;
      for (var i = 0; i < participents.length; i++) {
        if (!participents[i].chapati) {
          chapatiParticipents = chapatiParticipents + 1;
        }
        if (!participents[i].salan) {
          salanParticipents = salanParticipents + 1;
        }
        participents[i].amount = 0;
      }
      return { chapatiParticipents, salanParticipents };
    },
    divideCostOnParticipents(payload) {
      const {
        participents,
        chapatiCostPerMember,
        salanCostPerMember,
      } = payload;
      for (var i = 0; i < participents.length; i++) {
        if (!participents[i].chapati) {
          participents[i].amount =
            participents[i].amount + chapatiCostPerMember;
        }
        if (!participents[i].salan) {
          participents[i].amount = participents[i].amount + salanCostPerMember;
        }
      }
      return participents;
    },
    async saveTodaysBill() {
      var participents = this.todaysBill.participents;
      const {
        chapatiParticipents,
        salanParticipents,
      } = this.chapatiAndSalanParticipents(participents);
      const chapatiCostPerMember =
        this.todaysBill.chapati / chapatiParticipents;
      const salanCostPerMember = this.todaysBill.salan / salanParticipents;
      const payload = {
        participents,
        chapatiCostPerMember,
        salanCostPerMember,
      };
      participents = this.divideCostOnParticipents(payload);
      const participentsIds = [];
      participents.forEach(participent => {
        participentsIds.push(participent.userId);
      });
      const todaysBill = {
        chapatiCost: parseInt(this.todaysBill.chapati),
        salanCost: parseInt(this.todaysBill.salan),
        participents: participentsIds,
        participentsInfo: participents,
      };
      console.log(todaysBill);
      await this.$store.dispatch('saveTodaysBill', todaysBill);
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
