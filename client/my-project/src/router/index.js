import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import intro from '@/components/intro'
import canteenMenu from '@/components/canteenMenu'
import cart from '@/components/cart'
import record from '@/components/record'
import forum from '@/components/forum'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '',
      component: intro
    },
    {
      path: '/canteenMenu',
      name: 'canteenMenu',
      component: canteenMenu
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum
    }
  ]
})

// import canteenMenu from '../components/canteenMenu/canteenMenu.vue'
// import cart from '../components/cart/cart.vue'
// import record from '../components/record/record.vue'

// var routes = [{
//     name: 'canteenMenu',
//     path: '/canteenMenu',
//     component: canteenMenu
// },
// {
//     name: 'cart',
//     path: '/cart',
//     component: cart
// },
// {
//     name: 'record',
//     path: '/record',
//     component: record
// },
// ]

// var router = new VueRouter({
//     routes
// })

// export default router
