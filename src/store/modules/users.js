import { GET } from './functions';

const state = {
  users: [],
};

const getters = {
  users: state => state.users,
};

const actions = {
  async getUsers(context) {
    await GET(context, '/admin/users', 'saveUsers');
  },
};

const mutations = {
  saveUsers(state, data) {
    state.users = data.users;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
