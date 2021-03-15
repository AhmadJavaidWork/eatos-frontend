<template>
  <v-app>
    <v-main class="app">
      <notifications group="auth" />
      <Navbar />
      <vue-page-transition name="fade-in-right">
        <router-view></router-view>
      </vue-page-transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['user']),
  },
  async created() {
    this.$store.dispatch('getUser');
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.app {
  background-color: #eeeeee;
}
</style>
