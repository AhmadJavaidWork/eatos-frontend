import { GET, PUT, NOTIFY } from './functions';
import moment from 'moment';

const state = {
  wallet: {},
  payments: [],
  allPayments: []
};

const getters = {
  wallet: state => state.wallet,
  payments: state => state.payments,
   allPayments: state => state.allPayments,
};

const actions = {
  async getUserWallet(context) {
    await GET(context, '/wallets', 'saveUserWallet');
  },
  async getPayments(context) {
    await GET(context, '/payments', 'savePayments');
  },
  async getAllPayments(context) {
    GET(context, '/admin/payments', 'saveAllPayments');
  },
  addBalance(context, payload) {
    PUT(context, '/admin/wallets', 'addBalance', payload, payload.id);
  },
};

const mutations = {
  saveUserWallet(state, data) {
    state.wallet = data.wallet;
  },
  savePayments(state, data) {
    const payments = data.payments
    payments.forEach(payment => {
      payment.day = moment(payment.created_at)
        .format('dddd, MMM Do YYYY')
        .split(',')[0];
      payment.created_at = moment(payment.created_at)
        .format('dddd, MMM Do YYYY')
        .split(',')[1];
    });
    state.payments = payments;
  },
  saveAllPayments(state, data) {
    const allPayments = data.payments
    allPayments.forEach(payment => {
      payment.day = moment(payment.created_at)
        .format('dddd, MMM Do YYYY')
        .split(',')[0];
      payment.created_at = moment(payment.created_at)
        .format('dddd, MMM Do YYYY')
        .split(',')[1];
    });
    state.allPayments = allPayments;
  },
  addBalance(state, data) {
    if (data.wallet) {
      const notification = {
        group: 'auth',
        type: 'success',
        duration: 3000,
        title: `Credit Added Successfully`,
      };
      NOTIFY(notification);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
