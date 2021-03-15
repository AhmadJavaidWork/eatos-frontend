import Home from '@/views/Home.vue';
import SignIn from '@/views/auth/SignIn';
import SignUp from '@/views/auth/SignUp';
import EditProfile from '@/views/profile/EditProfile';
import Dashboard from '@/views/profile/Dashboard';
import NewBill from '@/views/admin/NewBill';
import AllBills from '@/views/admin/AllBills';
import EditBill from '@/views/admin/EditBill';
import ViewBill from '@/views/admin/ViewBill';
import AddBalance from '@/views/admin/AddBalance';
import ViewUserBill from '@/views/bills/ViewUserBill';
import Payments from '@/views/profile/Payments';
import AllPayments from '@/views/admin/AllPayments';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/new-bill',
    name: 'NewBill',
    component: NewBill,
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: '/admin/all-bills',
    name: 'AllBills',
    component: AllBills,
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: '/admin/edit-bill/:id',
    name: 'EditBill',
    component: EditBill,
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: '/admin/view-bill/:id',
    name: 'ViewBill',
    component: ViewBill,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/add-balance',
    name: 'AddBalance',
    component: AddBalance,
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: '/view-bill/:id',
    name: 'ViewUserBill',
    component: ViewUserBill,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/all-payments',
    name: 'AllPayments',
    component: AllPayments,
    meta: {
      requiresAuth: true,
    },
  },
];
