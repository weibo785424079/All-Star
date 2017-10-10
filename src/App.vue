<template>
  <div id="app">
    <img src="./assets/logo.png" style="width:5rem;">
    <transition name="router-fade" mode="out-in">
    <router-view/>
    </transition>
    <svg-icon></svg-icon>	
  </div>
</template>

<script>

import svgIcon from './components/common/svg'
export default {
  name: 'app',
  components: {
    svgIcon
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
  margin-top: 60px;
}
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
