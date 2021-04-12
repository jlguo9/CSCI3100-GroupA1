import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import intro from '@/components/intro'
import canteenMenu from '@/components/canteenMenu'
import cart from '@/components/cart'
import record from '@/components/record'
import forum from '@/components/forum'
import gallery1 from '@/components/gallery1'
import gallery2 from '@/components/gallery2'

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
      path: '/gallery1',
      name: 'gallery1',
      component: gallery1
    },
    {
      path: '/gallery2',
      name: 'gallery2',
      component: gallery2
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum
    }
  ]
})
