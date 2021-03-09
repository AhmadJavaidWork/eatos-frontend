<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="400px"
      color="white"
    >
      <h1 class="card-title">Edit Bill</h1>
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
            v-for="(member, index) in activeBill.members"
            :key="index"
            dense
          >
            <v-col cols="12" sm="12" md="5" lg="5">
              <v-select
                v-model="member.user.name"
                placeholder="Name"
                :items="allMembers"
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
                v-model="member.chapati"
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
                v-model="member.salan"
                label="Salan"
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              xs="6"
              sm="4"
              md="3"
              lg="3"
              v-if="activeBill.members.length > 1"
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
                v-model="activeBill.salan"
                :rules="amountRules"
                required
                outlined
                dense
              >
                ></v-text-field
              >
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label for="chapati">Chapati Cost</label>
              <v-text-field
                class="rounded-lg mt-1"
                placeholder="e.g; 1500"
                type="number"
                v-model="activeBill.chapati"
                :rules="amountRules"
                required
                outlined
                dense
              >
                ></v-text-field
              >
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="updateBill"
            class="mb-10 mr-2 green lighten-2"
            :disabled="!checkValid()"
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
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Bill',
  computed: {
    ...mapGetters(['activeBill', 'allMembers']),
  },
  async created() {
    await this.$store.dispatch('getTodaysCost');
    await this.$store.dispatch('getAllMembers');
    if (this.$route.params.id) {
      await this.$store.dispatch('getActiveBill', this.$route.params.id);
    }
  },
  data() {
    return {
      isValid: false,
      amountRules: [v => !!v || 'Amount is required'],
    };
  },
  methods: {
    addMember() {
      this.activeBill.members.push({
        user: {},
        chapati: false,
        salan: false,
        cost: 0,
      });
    },
    removeMember(index) {
      this.activeBill.members.splice(index, 1);
    },
    checkValid() {
      var check = true;
      for (var i = 0; i < this.activeBill.members.length; i++) {
        if (!this.activeBill.members[i].user.name) check = false;
        if (
          this.activeBill.members[i].chapati === false &&
          this.activeBill.members[i].salan === false
        )
          check = false;
        if (!this.isValid) check = false;
      }
      return check;
    },
    chapatiAndSalanMembers(members) {
      var chapatiMembers = 0;
      var salanMembers = 0;
      for (var i = 0; i < members.length; i++) {
        if (members[i].chapati) chapatiMembers = chapatiMembers + 1;
        if (members[i].salan) salanMembers = salanMembers + 1;
        members[i].cost = 0;
      }
      return { chapatiMembers, salanMembers };
    },
    divideCostOnMembers(payload) {
      const { members, chapatiCostPerMember, salanCostPerMember } = payload;
      for (var i = 0; i < members.length; i++) {
        if (members[i].chapati)
          members[i].cost = members[i].cost + chapatiCostPerMember;
        if (members[i].salan)
          members[i].cost = members[i].cost + salanCostPerMember;

        delete members[i].chapati;
        delete members[i].salan;
      }
      return members;
    },
    async updateBill() {
      var members = this.activeBill.members;
      const { chapatiMembers, salanMembers } = this.chapatiAndSalanMembers(
        members
      );
      const chapatiCostPerMember = this.activeBill.chapati / chapatiMembers;
      const salanCostPerMember = this.activeBill.salan / salanMembers;
      const payload = {
        members,
        chapatiCostPerMember,
        salanCostPerMember,
      };
      members = this.divideCostOnMembers(payload);
      const activeBill = {
        salan: parseInt(this.activeBill.salan),
        chapati: parseInt(this.activeBill.chapati),
        members,
      };
      console.log(activeBill);
      await this.$store.dispatch('updateActiveBill', activeBill);
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
