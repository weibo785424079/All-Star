<template>
  <div class="hello">
    <img src="../assets/curry/timg.jpeg" style="width:5rem;border-radius:50%;">
    <h1>{{ msg }}</h1>
    <h2>Welcome ！</h2>
    <section class="pub-star">
      热门球星
      <div class="img-item">
        <img src="../assets/curry/timg1.jpeg" alt="curry">
        <img src="../assets/curry/timg4.jpeg" alt="curry">
        <img src="../assets/curry/timg3.jpeg" alt="curry">
      </div>
    </section>
    <section class="pub-star">
      推荐球星
      <!-- <div class="img-item">
        <img src="../assets/curry/timg1.jpeg" alt="curry">
        <img src="../assets/curry/timg4.jpeg" alt="curry">
        <img src="../assets/curry/timg3.jpeg" alt="curry">
      </div> -->
    </section>
    <section class="pub-star">
      球星趣闻
    </section>
  </div>
</template>

<script>
// import api from '@/api/account'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: '欢迎来NABA球星卡基地！',
      user: []
    }
  },
  mounted () {
    this.$bus.$on('bus', function () {
      debugger
    })
    this.getUser({ id: 2 })
  },
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../static/mixin';
h1,
h2 {
    background-image: -webkit-linear-gradient(left,#D81159, #E53A40 10%, #FFBC42 20%, #75D701 30%, #30A9DE 40%,#D81159 50%, #E53A40 60%, #FFBC42 70%, #75D701 80%, #30A9DE 90%,#D81159);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 100%;
    animation: flowlight 5s linear infinite;
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
@keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}
.pub-star {
  text-align: left;
  padding: 10px;
  @include sc(16px,#FFBC42);
  .img-item {
    height: 140px;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    font-size: 0;
    white-space: nowrap;
    img {
      @include borderRadius(5px);
      @include wh(150px,140px);
      margin-right: 5px;
    }
  }
}
</style>
