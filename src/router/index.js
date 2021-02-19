import Vue from 'vue'
import Router from 'vue-router'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/UploadFile',
      name: 'UploadPage',
      component: () => import('@/components/UploadPage')
    },
    
    { // 重定向
      path: '/',
      redirect: '/UploadFile'
    },
  ]
})
