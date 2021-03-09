import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import wallet from './modules/wallet';
import bills from './modules/bills';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    wallet,
    bills,
    users,
  },
});
