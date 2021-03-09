import { GET, POST } from './functions';
import moment from 'moment';

const state = {
  bills: [],
  todaysBill: {
    participents: [],
  },
  allBills: [],
};

const getters = {
  bills: state => state.bills,
  todaysBill: state => state.todaysBill,
  allBills: state => state.allBills,
};

const actions = {
  getUserBills(context) {
    GET(context, '/user-bills', 'saveUserBills');
  },
  saveTodaysBill(context, todaysBill) {
    POST(context, '/admin/bills', '', todaysBill);
  },
  getAllBills(context) {
    GET(context, '/admin/bills', 'saveAllBills');
  },
};

const mutations = {
  saveUserBills(state, data) {
    const bills = data.userBills;
    bills.forEach(bill => {
      bill.day = moment(bill.createdAt)
        .format('dddd, MMM Do YYYY')
        .split(',')[0];
      bill.createdAt = moment(bill.createdAt)
        .format('dddd, MMM Do YYYY')
        .split(',')[1];
    });
    state.bills = bills;
  },
  saveAllBills(state, data) {
    const allBills = data.allBills;
    allBills.forEach(bill => {
      bill.day = moment(bill.createdAt)
        .format('dddd, MMM Do YYYY')
        .split(',')[0];
      bill.createdAt = moment(bill.createdAt)
        .format('dddd, MMM Do YYYY')
        .split(',')[1];
    });
    state.allBills = data.allBills;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
