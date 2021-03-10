import { GET, PUT } from './functions';

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
  addBalance(context, payload) {
    PUT(context, '/admin/wallets', '', { amount: payload.amount }, payload.id);
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
