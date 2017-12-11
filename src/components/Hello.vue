<template>
  <div class="hello">
     <div class="page-swipe">
        <mt-swipe>
            <mt-swipe-item class="slide1">
                <!-- <router-link to="/mine"> -->
                    <img src="../assets/curry/timg1.jpeg"/>
                <!-- </router-link> -->
            </mt-swipe-item>
            <mt-swipe-item class="slide2">
                <!-- <router-link to="/product"> -->
                    <img src="../assets/curry/timg3.jpeg"/>
                <!-- </router-link> -->
            </mt-swipe-item>
            <mt-swipe-item class="slide3">
                <!-- <router-link to="/detailPage"> -->
                    <img src="../assets/curry/timg4.jpeg"/>
                <!-- </router-link> -->
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- <img src="../assets/curry/timg.jpeg" style="width:5rem;border-radius:50%;"> -->
    <h1>{{ msg }}</h1>
    <h2>Welcome ！{{userInfo && userInfo.name}}</h2>
    <section class="pub-star">
      热门球星
      <div class="img-item">
        <img v-for="(item,index) in starInfos" :src="item.pic" :key="index" alt="curry" @click="showStarDetail(index)">
        <!-- <img src="../assets/stars/lin1.jpg" alt="curry" @click="showStarDetail"> -->
        <!-- <img src="../assets/stars/deluozan1.jpg" alt="curry" @click="showStarDetail"> -->
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
      <interesting-news></interesting-news>
    </section>
    <alert-tip v-show="alertTipVisiable" :starInfo="currStarInfo" @closeTip="closeTip" :alert-text="'hello'"></alert-tip>
  </div>
</template>

<script>
// import api from '@/api/account'
import interestingNews from './star/star-interesting-news.vue'
import alertTip from '@/components/common/alertTip.vue'
import headTop from '../components/header/head.vue'
import {mapState, mapActions} from 'vuex'
import starCtrl from '@/api/star'
// import $ from 'jquery'
export default {
  name: 'hello',
  data () {
    return {
      msg: '欢迎来NBA全明星动员！',
      user: [],
      alertTipVisiable: false,
      starInfos: [],
      currStarInfo: {}
    }
  },
  components: {
    interestingNews,
    alertTip,
    headTop
  },
  mounted () {
    const _this = this
    this.$bus.$on('bus', function () {
    })
    // this.getUser({ id: 2 })
    starCtrl.getStarInfo({}).then(res => {
      if (res.data.status === 200) {
        _this.starInfos = res.data.data
      }
    }).catch(err => {
      console.log(err)
    })
    // 不要删除 jsonp例子
    // $.ajax({
    //   url: 'api/jsonp/',
    //   type: 'GET',
    //   data: {},
    //   dataType: 'jsonp',
    //   jsonp: 'callback',
    //   jsonpCallback: 'callback',
    //   success: function (res) {
    //     console.log(res.name)
    //   },
    //   error: function (err) {
    //     console.log(err)
    //     // callback(err)
    //   }
    // })
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    closeTip () {
      this.alertTipVisiable = false
    },
    showStarDetail (id) {
      this.alertTipVisiable = true
      this.currStarInfo = this.starInfos[id]
    }
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
.hello {
  // padding-top: 1rem;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
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

.mint-swipe {
    width: 100%;
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
.page-swipe img {
      height: 100%;
      width: 100%
}
.mint-swipe a {
    display: block;
    height: 200px;
}
.slide1 {
    background-color: #0089dc;
    color: #fff;
    position: relative;
}
.slide2 {
    background-color: #ffd705;
    color: #000;
    position: relative;
}

.slide3 {
    background-color: #ff2d4b;
    color: #fff;
    position: relative;
}
</style>
