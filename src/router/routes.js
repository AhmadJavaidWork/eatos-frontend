import Home from '../views/Home.vue';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';
import EditProfile from '../views/profile/EditProfile';
import Dashboard from '../views/profile/Dashboard';
import Bill from '../views/admin/Bill';
import AllBills from '../views/admin/AllBills';
import EditBill from '../views/admin/EditBill';
import ViewBill from '../views/bills/ViewBill';
import AddBalance from '../views/admin/AddBalance';

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
    path: '/admin/bill',
    name: 'Bill',
    component: Bill,
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
    path: '/admin/edit-bill',
    name: 'EditBill',
    component: EditBill,
    meta: {
      requiresAuth: true,
      admin: true,
    },
  },
  {
    path: '/view-bill',
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
];
