import { GET, GETBYID, POST } from './functions';
import moment from 'moment';

const state = {
  bills: [],
  todaysBill: {
    participents: [],
  },
  allBills: [],
  activeBill: {},
};

const getters = {
  bills: state => state.bills,
  todaysBill: state => state.todaysBill,
  allBills: state => state.allBills,
  activeBill: state => state.activeBill,
};

const actions = {
  getUserBills(context) {
    GET(context, '/user-bills', 'saveUserBills');
  },
  saveTodaysBill(context, todaysBill) {
    POST(context, '/admin/bills', 'saveTodaysBill', todaysBill);
  },
  getAllBills(context) {
    GET(context, '/admin/bills', 'saveAllBills');
  },
  getActiveBill(context, id) {
    GETBYID(context, '/bills', 'saveActiveBill', id);
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
  saveTodaysBill(state, data) {
    state.todaysBill = data.billInfo;
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
  saveActiveBill(state, data) {
    const bill = data.bill;
    bill.participentsInfo = data.participentsInfo;
    state.activeBill = data.bill;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
