import { GET, GETBYID, POST, NOTIFY, PUT } from './functions';
import moment from 'moment';

const state = {
  bills: [],
  newBill: { userBills: [] },
  allBills: [],
  activeBill: { userBills: [] },
};

const getters = {
  bills: state => state.bills,
  newBill: state => state.newBill,
  allBills: state => state.allBills,
  activeBill: state => state.activeBill,
};

const actions = {
  async getUserBills(context) {
    await GET(context, '/user-bills', 'saveUserBills');
  },
  saveNewBill(context, newBill) {
    POST(context, '/admin/bills', 'saveNewBill', newBill);
  },
  getAllBills(context) {
    GET(context, '/admin/bills', 'saveAllBills');
  },
  async getActiveBill(context, id) {
    await GETBYID(context, '/admin/bills', 'saveActiveBill', id);
  },
  async updateBill(context, payload) {
    await PUT(context, '/admin/bills', 'updatBill', payload.bill, payload.id);
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
  saveNewBill(state, data) {
    if (data.bill) {
      const notification = {
        group: 'auth',
        type: 'success',
        duration: 3000,
        title: `Bill Added Successfully`,
      };
      NOTIFY(notification);
    }
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
    state.activeBill = data.bill;
  },
  updatBill(state, data) {
    if (data.bill) {
      const notification = {
        group: 'auth',
        type: 'success',
        duration: 3000,
        title: `Bill Updated Successfully`,
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
