import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BuyCar from '@/components/page/BuyCar'
import test from '@/components/page/test'
import ShoppingCar from '@/components/page/ShoppingCar'
import checkbox from '@/components/page/checkbox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/BuyCar',
      name: 'BuyCar',
      component: BuyCar
    },
    {
      path: '/ShoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: checkbox
    }
  ]
})
