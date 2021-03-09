import { GET } from './functions';

const state = {
  wallet: {},
};

const getters = {
  wallet: state => state.wallet,
};

const actions = {
  getUserWallet(context) {
    GET(context, '/wallets', 'saveUserWallet');
  },
};

const mutations = {
  saveUserWallet(state, data) {
    state.wallet = data.wallet;
  },
  saveBills(state, bills) {
    state.bills = bills;
  },
  saveActiveBill(state, activeBill) {
    state.activeBill = activeBill;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
