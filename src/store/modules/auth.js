import axios from 'axios';
import Api from '../../api';
import { NOTIFY } from './functions';
import config from '../../config';

const access_token = config.access_token;

const state = {
  user: {},
};

const getters = {
  user: state => state.user,
};

const actions = {
  async signup(context, user) {
    const res = await axios.post('users/register', {
      access_token,
      user,
    });
    if (res.data.error) return res;
    context.commit('saveUser', res.data);
    return res;
  },
  async signin(context, user) {
    const res = await axios.post(
      'auth/sign-in',
      {
        access_token: access_token,
      },
      {
        auth: {
          username: user.email,
          password: user.password,
        },
      }
    );
    if (res.data.error) return res;
    context.commit('saveUser', res.data);
    return res;
  },
  async signout(context) {
    await axios.get('auth/sign-out');
    context.commit('signout');
  },
  async updateUser(context, user) {
    user.role = 1;
    const id = JSON.parse(localStorage.getItem('user')).id;
    const res = await Api().put(`/api/users/${id}`, user);
    context.commit('updateUser', res.data);
    return res;
  },
  async getUserData(context) {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const res = await Api().get(`/api/users/${id}`);
    context.commit('updateUser', res.data);
    return res;
  },
  getUser(context) {
    context.commit('getUserFromLocalStorage');
  },
};

const mutations = {
  saveUser(state, data) {
    const user = data.user;
    const token = data.accessToken;
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  },
  getUserFromLocalStorage(state) {
    const user = JSON.parse(localStorage.getItem('user'));
    state.user = user;
  },
  signout(state) {
    const notification = {
      group: 'auth',
      type: 'success',
      duration: 3000,
      title: `Bye ${state.user.name}`,
      text: 'See you later',
    };
    NOTIFY(notification);
    state.user = {};
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  updateUser(state, user) {
    user.picture = `https://gravatar.com/avatar/${Math.floor(
      Math.random() * 1000000
    ) + 1}?d=identicon`;
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
