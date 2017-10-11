<template>
  <div id="app">
    <head-top goBack="true" headTitle="All-Stars" :signinUp="true"></head-top>    
    <transition name="router-fade" mode="out-in" >
    <router-view/>
    </transition>
    <svg-icon></svg-icon>	
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import headTop from './components/header/head.vue'
import footGuide from './components/footer/footGuide.vue'
import svgIcon from './components/common/svg'
export default {
  name: 'app',
  components: {
    svgIcon,
    headTop,
    footGuide
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
  padding-top: 1rem;
  padding-bottom: 100px;
}
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
