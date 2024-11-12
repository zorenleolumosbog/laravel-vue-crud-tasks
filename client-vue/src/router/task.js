export default [
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/tasks/Manager.vue'),
      beforeEnter: (to, from, next) => {
        const auth = localStorage.getItem('authToken');
        if (!auth) {
          next({ path: '/' });
        } else {
          next();
        }
      },
    },
  ];