// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import store from './store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import VueRx from 'vue-rx'

Vue.config.productionTip = false
Vue.prototype.$bus = Vue.prototype.$bus || new Vue()
Vue.use(MintUI)
Vue.use(VueRx, { Observable, Subscription })
/* eslint-disable no-new */
const getStyle = (ele, attr, NumberMode = 'int') => {
  let target
  if (attr === 'scrollTop') {
    target = ele.scrollTop
  } else if (ele.currentStyle) { // ie
    target = ele.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(ele, null)[attr] // defaultView
  }
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target)
}

Vue.directive('load-more', {
  bind (el, binding) {
    let windowHeight = window.screen.height
    let height
    let setTop
    let paddingBottom
    let marginBottom
    let requestFram
    let oldScrollTop
    let scrollEl
    let heightEl
    let scrollType = el.attributes.type && el.attributes.type.value
    let scrollReduce = 2

    if (scrollType === '2') {
      scrollEl = el
      // setTimeout(() => {
        // heightEl = el.children[0]
      // }, 5000)
      heightEl = el
    } else {
      scrollEl = document.documentElement
      heightEl = el
    }

    el.addEventListener('touchstart', () => {
      height = heightEl.clientHeight
      if (scrollType === 2) {
        // height = height
      }
      setTop = el.offsetTop
      paddingBottom = getStyle(el, 'paddingBottom')
      marginBottom = getStyle(el, 'marginBottom')
    }, false)

    el.addEventListener('touchmove', () => {
      loadMore()
    }, false)
    el.addEventListener('touchend', () => {
      oldScrollTop = scrollEl.scrollTop
      moveEnd()
    }, false)

    const moveEnd = () => {
      requestFram = requestAnimationFrame(() => {
        if (scrollEl.scrollTop !== oldScrollTop) {
          oldScrollTop = scrollEl.scrollTop
          moveEnd()
        } else {
          cancelAnimationFrame(requestFram)
          height = heightEl.clientHeight
          loadMore()
        }
      })
    }

    const loadMore = () => {
      console.log(scrollEl.scrollTop + windowHeight - (height + setTop + paddingBottom + marginBottom - scrollReduce))
      if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
        binding.value()
      }
    }
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
