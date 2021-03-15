import Vue from 'vue';
import Api from '../../api';
import router from '../../router';
import store from '../../store';

export const GETBYID = async (context, URL, mutation, id) => {
  const res = await Api().get(`${URL}/${id}`);
  if (res.data.error === 'You are not authenticated') {
    store.dispatch('signout');
    router.push('/signin');
  }
  if (!res.data.error) context.commit(mutation, res.data);
};

export const GET = async (context, URL, mutation) => {
  const res = await Api().get(`${URL}`);
  if (res.data.error === 'You are not authenticated') {
    store.dispatch('signout');
    router.push('/signin');
  }
  if (!res.data.error) context.commit(mutation, res.data);
  return res;
};

export const POST = async (context, URL, mutation, data) => {
  const res = await Api().post(`${URL}`, data);
  if (res.data.error === 'You are not authenticated') {
    store.dispatch('signout');
    router.push('/signin');
  }
  if (res.data) context.commit(mutation, res.data);
  return res;
};

export const PUT = async (context, URL, mutation, data, id) => {
  const res = await Api().put(`${URL}/${id}`, data);
  if (res.data.error === 'You are not authenticated') {
    store.dispatch('signout');
    router.push('/signin');
  }
  if (res.data) context.commit(mutation, res.data);
};

export const DELETE = async (context, URL, mutation, id) => {
  const res = await Api().delete(`${URL}/${id}`);
  if (res.data.error === 'You are not authenticated') {
    store.dispatch('signout');
    router.push('/signin');
  }
  if (res.status === 204) context.commit(mutation, id);
};

export const NOTIFY = notification => {
  const { group, type, duration, title, text } = notification;
  Vue.notify({
    group,
    type,
    duration,
    title,
    text,
  });
};
