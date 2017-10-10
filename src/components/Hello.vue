<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul v-for="(item,index) in user" :key="index">
      <li><a href="https://vuejs.org" target="_blank">{{item.name}}</a></li>
      <li><a href="https://vuejs.org" target="_blank">{{item.status}}</a></li>
      <li><a href="https://vuejs.org" target="_blank">{{item.org}}</a></li>
      <li><a href="https://vuejs.org" target="_blank">{{item.level}}</a></li>
      <br>
    </ul>
  </div>
</template>

<script>
import api from '@/api/account'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js',
      user: []
    }
  },
  mounted () {
    api.getUsers().then(res => {
      const { data } = res.data
      console.log(data)
      this.user = data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
