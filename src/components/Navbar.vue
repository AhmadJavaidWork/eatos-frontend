<template>
  <nav>
    <v-app-bar dark class="nav-bar" flat app color="primary">
      <v-app-bar-nav-icon
        v-if="isAuthenticated"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        class="title text-uppercase"
        @click="$router.push('/').catch(err => {})"
      >
        <span class="font-weight-light">eat</span>
        <span>os</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="$router.push('/signin').catch(err => {})"
        v-if="!isAuthenticated"
      >
        <span>log in</span>
        <v-icon dark right>mdi-login</v-icon>
      </v-btn>
      <v-btn text v-if="isAuthenticated" @click="signout()">
        <span>log out</span>
        <v-icon dark right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      dark
      class="drawer"
      color="primary"
      v-if="isAuthenticated"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item-avatar class="ml-6" size="200">
          <v-img :src="user ? user.picture : ''" alt="Profile Avatar"> </v-img>
        </v-list-item-avatar>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          router
          :disabled="!user.name"
          @click="$router.push(link.route).catch(err => {})"
        >
          <v-list-item-action v-if="checkAdmin(link)">
            <v-icon :disabled="!user.name" left>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="checkAdmin(link)">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    if (this.user) {
      this.isAuthenticated = true;
    }
  },
  data() {
    return {
      isAuthenticated: false,
      drawer: true,
      links: [
        {
          icon: 'mdi-account-box',
          text: 'Dashboard',
          route: '/dashboard',
          admin: false,
        },
        {
          icon: 'mdi-text-box-plus-outline',
          text: 'Add Bill',
          route: '/admin/bill',
          admin: true,
        },
        {
          icon: 'mdi-text-box-multiple-outline',
          text: 'All Bills',
          route: '/admin/all-bills',
          admin: true,
        },
        {
          icon: 'mdi-wallet-plus-outline',
          text: 'Add Balace',
          route: '/admin/add-balance',
          admin: true,
        },
      ],
    };
  },
  methods: {
    async signout() {
      await this.$store.dispatch('signout');
      this.$router.push('/signin');
    },
    checkAdmin(link) {
      if (link.admin && this.user.role === 'admin') return true;
      if (!link.admin) return true;
      return false;
    },
  },
  watch: {
    user: function(user) {
      if (!user.id) {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
      }
    },
  },
};
</script>

<style scoped>
.title {
  cursor: pointer;
}
.nav-bar {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
}
.drawer {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
}
</style>
