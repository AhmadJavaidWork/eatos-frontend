<template>
  <div class="dashboard">
    <v-card
      class="mx-auto mt-16"
      width="800px"
      min-height="700px"
      color="white"
    >
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
      bill: {},
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
