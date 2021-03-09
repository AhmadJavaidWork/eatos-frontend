import { GET, POST, PUT } from './functions';

const state = {
  todaysCost: {
    members: [{ user: { name: '' }, chapati: false, salan: false, cost: 0 }],
    salan: '',
    chapati: '',
  },
  allMembers: ['Ahmad', 'Ahsan', 'Hizqeel', 'Fawad', 'Nauman', 'Ayaz'],
  allBills: [],
};

const getters = {
  todaysCost: state => state.todaysCost,
  allMembers: state => state.allMembers,
  allBills: state => state.allBills,
};

const actions = {
  getTodaysCost(context) {
    GET(context, '/todays-cost', 'saveTodaysCost');
  },
  getAllMembers(context) {
    GET(context, '/all-members', 'saveAllMembers');
  },
  saveTodaysCost(context, todaysCost) {
    POST(context, '/todays-cost', 'saveTodaysCost', todaysCost);
  },
  updateTodaysCost(context, todaysCost) {
    PUT(context, '/todays-cost', 'saveTodaysCost', todaysCost, todaysCost.id);
  },
  getAllBills(context) {
    GET(context, '/all-bills', 'saveAllBills');
  },
};

const mutations = {
  saveTodaysCost(state, todaysCost) {
    state.todaysCost = todaysCost;
  },
  saveAllMembers(state, allMembers) {
    state.allMembers = allMembers;
  },
  saveAllBills(state, allBills) {
    state.allBills = allBills;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
