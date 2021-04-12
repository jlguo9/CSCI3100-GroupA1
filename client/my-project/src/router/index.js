import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import intro from '@/components/intro'
import canteenMenu from '@/components/canteenMenu'
import cart from '@/components/cart'
import record from '@/components/record'
import forum from '@/components/forum'
import gallery1 from '@/components/gallery1'
import gallery1a from '@/components/gallery1a'
import gallery1b from '@/components/gallery1b'
import gallery1c from '@/components/gallery1c'
import gallery1d from '@/components/gallery1d'
import gallery1e from '@/components/gallery1e'
import gallery1f from '@/components/gallery1f'
import gallery1g from '@/components/gallery1g'
import gallery2 from '@/components/gallery2'
import gallery2a from '@/components/gallery2a'
import gallery2b from '@/components/gallery2b'
import gallery2c from '@/components/gallery2c'
import gallery2d from '@/components/gallery2d'
import gallery2e from '@/components/gallery2e'
import gallery2f from '@/components/gallery2f'
import gallery2g from '@/components/gallery2g'
import gallery2h from '@/components/gallery2h'
import gallery3 from '@/components/gallery3'
import gallery3a from '@/components/gallery3a'
import gallery3b from '@/components/gallery3b'
import gallery3c from '@/components/gallery3c'
import gallery4 from '@/components/gallery4'
import gallery4a from '@/components/gallery4a'
import gallery4b from '@/components/gallery4b'
import gallery5 from '@/components/gallery5'
import gallery5a from '@/components/gallery5a'
import gallery5b from '@/components/gallery5b'
import gallery5c from '@/components/gallery5c'
import gallery5d from '@/components/gallery5d'
import gallery6 from '@/components/gallery6'
import gallery6a from '@/components/gallery6a'
import gallery6b from '@/components/gallery6b'
import gallery6c from '@/components/gallery6c'
import gallery6d from '@/components/gallery6d'
import gallery7 from '@/components/gallery7'
import gallery7a from '@/components/gallery7a'
import gallery7b from '@/components/gallery7b'
import gallery7c from '@/components/gallery7c'
import gallery7d from '@/components/gallery7d'
import gallery8 from '@/components/gallery8'
import gallery8a from '@/components/gallery8a'
import gallery8b from '@/components/gallery8b'
import gallery9 from '@/components/gallery9'
import gallery9a from '@/components/gallery9a'
import gallery10 from '@/components/gallery10'
import gallery10a from '@/components/gallery10a'
import gallery11 from '@/components/gallery11'
import gallery11a from '@/components/gallery11a'
import gallery11b from '@/components/gallery11b'
import gallery11c from '@/components/gallery11c'

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
      path: '/gallery1a',
      name: 'gallery1a',
      component: gallery1a
    },
    {
      path: '/gallery1b',
      name: 'gallery1b',
      component: gallery1b
    },
    {
      path: '/gallery1c',
      name: 'gallery1c',
      component: gallery1c
    },
    {
      path: '/gallery1d',
      name: 'gallery1d',
      component: gallery1d
    },
    {
      path: '/gallery1e',
      name: 'gallery1e',
      component: gallery1e
    },
    {
      path: '/gallery1f',
      name: 'gallery1f',
      component: gallery1f
    },
    {
      path: '/gallery1g',
      name: 'gallery1g',
      component: gallery1g
    },
    {
      path: '/gallery2',
      name: 'gallery2',
      component: gallery2
    },
    {
      path: '/gallery2a',
      name: 'gallery2a',
      component: gallery2a
    },
    {
      path: '/gallery2b',
      name: 'gallery2b',
      component: gallery2b
    },
    {
      path: '/gallery2c',
      name: 'gallery2c',
      component: gallery2c
    },
    {
      path: '/gallery2d',
      name: 'gallery2d',
      component: gallery2d
    },
    {
      path: '/gallery2e',
      name: 'gallery2e',
      component: gallery2e
    },
    {
      path: '/gallery2f',
      name: 'gallery2f',
      component: gallery2f
    },
    {
      path: '/gallery2g',
      name: 'gallery2g',
      component: gallery2g
    },
    {
      path: '/gallery2h',
      name: 'gallery2h',
      component: gallery2h
    },
    {
      path: '/gallery3',
      name: 'gallery3',
      component: gallery3
    },
    {
      path: '/gallery3a',
      name: 'gallery3a',
      component: gallery3a
    },
    {
      path: '/gallery3b',
      name: 'gallery3b',
      component: gallery3b
    },
    {
      path: '/gallery3c',
      name: 'gallery3c',
      component: gallery3c
    },
    {
      path: '/gallery4',
      name: 'gallery4',
      component: gallery4
    },
    {
      path: '/gallery4a',
      name: 'gallery4a',
      component: gallery4a
    },
    {
      path: '/gallery4b',
      name: 'gallery4b',
      component: gallery4b
    },
    {
      path: '/gallery5',
      name: 'gallery5',
      component: gallery5
    },
    {
      path: '/gallery5a',
      name: 'gallery5a',
      component: gallery5a
    },
    {
      path: '/gallery5b',
      name: 'gallery5b',
      component: gallery5b
    },
    {
      path: '/gallery5c',
      name: 'gallery5c',
      component: gallery5c
    },
    {
      path: '/gallery5d',
      name: 'gallery5d',
      component: gallery5d
    },
    {
      path: '/gallery6',
      name: 'gallery6',
      component: gallery6
    },
    {
      path: '/gallery6a',
      name: 'gallery6a',
      component: gallery6a
    },
    {
      path: '/gallery6b',
      name: 'gallery6b',
      component: gallery6b
    },
    {
      path: '/gallery6c',
      name: 'gallery6c',
      component: gallery6c
    },
    {
      path: '/gallery6d',
      name: 'gallery6d',
      component: gallery6d
    },
    {
      path: '/gallery7',
      name: 'gallery7',
      component: gallery7
    },
    {
      path: '/gallery7a',
      name: 'gallery7a',
      component: gallery7a
    },
    {
      path: '/gallery7b',
      name: 'gallery7b',
      component: gallery7b
    },
    {
      path: '/gallery7c',
      name: 'gallery7c',
      component: gallery7c
    },
    {
      path: '/gallery7d',
      name: 'gallery7d',
      component: gallery7d
    },
    {
      path: '/gallery8',
      name: 'gallery8',
      component: gallery8
    },
    {
      path: '/gallery8a',
      name: 'gallery8a',
      component: gallery8a
    },
    {
      path: '/gallery8b',
      name: 'gallery8b',
      component: gallery8b
    },
    {
      path: '/gallery9',
      name: 'gallery9',
      component: gallery9
    },
    {
      path: '/gallery9a',
      name: 'gallery9a',
      component: gallery9a
    },
    {
      path: '/gallery10',
      name: 'gallery10',
      component: gallery10
    },
    {
      path: '/gallery10a',
      name: 'gallery10a',
      component: gallery10a
    },
    {
      path: '/gallery11',
      name: 'gallery11',
      component: gallery11
    },
    {
      path: '/gallery11a',
      name: 'gallery11a',
      component: gallery11a
    },
    {
      path: '/gallery11b',
      name: 'gallery11b',
      component: gallery11b
    },
    {
      path: '/gallery11c',
      name: 'gallery11c',
      component: gallery11c
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum
    }
  ]
})
