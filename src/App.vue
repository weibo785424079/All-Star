<template>
  <div id="app">
    <head-top v-if="showHead" goBack="true" headTitle="All-Stars" :signinUp="true"></head-top>
    <transition name="router-fade" mode="out-in" >
    <router-view/>
    </transition>
    <svg-icon></svg-icon>	
    <foot-guide v-if="this.$route.fullPath != '/games'"></foot-guide>
  </div>
</template>

<script>

import headTop from './components/header/head.vue'
import footGuide from './components/footer/footGuide.vue'
import svgIcon from './components/common/svg'
import userApi from './api/account'
export default {
  name: 'app',
  components: {
    svgIcon,
    headTop,
    footGuide
  },
  computed: {
    showHead () { return this.$route.fullPath !== '/index' && this.$route.fullPath !== '/games' }
  },
  mounted () {
    userApi.checkLogin().then(res => {
      const path = this.$route.path
      if (!(path === '/index')) {
        if (res.data.status === 10001) {
          this.$router.push({
            path: '/login'
          })
        } else if (res.data.status === 200) {
          this.$store.commit('GET_USERINFO', res.data.data)
        }
      } else {
        if (res.data.status === 200) {
          this.$store.commit('GET_USERINFO', res.data.data)
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang='scss'>
@import './static/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // padding-top: 1rem;
  // padding-bottom: 100px;
  height: 100%;
}
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
