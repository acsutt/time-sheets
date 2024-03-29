import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import axios from 'axios';

axios.interceptors.request.use((config) => {
  if (config.url.includes('login') || config.url.includes('register')) {
    return config;
  }
  return {
    ...config, headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
}, (error) => {
  return Promise.reject(error);
});

// beforeEnter checks for the existence of the authentication token provided on a successful login
// all pages that should not be accessible without being logged in have beforeEnter on their route
// this will check the token and if it isn't present, will return to the home page if it isn't
const beforeEnter = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    next()
    return true;
  }
  next({ path: '/'});
  return false;
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home'),
    meta: {
      title: 'Time Sheets Web App',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login'),
    meta: {
      title: 'Time Sheets - Login',
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/Register'),
    meta: {
      title: 'Time Sheets - Register',
    }
  },
  {
    path: '/manage-user',
    name: 'manage-user',
    component: () => import('@/components/ManageUser'),
    meta: {
      title: 'Time Sheets - Manage User',
    },
    beforeEnter
  },
  {
    path: '/edit-user',
    name: 'edit-user',
    component: () => import('@/components/EditUser'),
    meta: {
      title: 'Time Sheets - Edit User',
    },
    beforeEnter
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/components/Calendar'),
    meta: {
      title: 'Time Sheets - Calendar',
    },
    beforeEnter
  },
  {
    path: '/log-activity',
    name: 'log-activity',
    component: () => import('@/components/CreateActivity'),
    meta: {
      title: 'Time Sheets - Log Time',
    },
    beforeEnter
  },
  {
    path: '/edit-activity',
    name: 'edit-activity',
    component: () => import('../components/EditActivity'),
    meta: {
      title: 'Time Sheets - Edit',
    },
    beforeEnter
  },
  {
    path: '/manage-activities',
    name: 'manage-activities',
    component: () => import('../components/ManageActivities'),
    meta: {
      title: 'Time Sheets - Manage Activities',
    },
    beforeEnter
  }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if(nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if(!nearestWithMeta) return next();
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
    .forEach(tag => document.head.appendChild(tag));
    next();
});

export default router
