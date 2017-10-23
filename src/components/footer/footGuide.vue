<template>
    <section id='foot_guide'>
        <section @click="gotoAddress({path: '/'})" class="guide_item">
            <!-- <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('index') !== -1? '#msiteActive' : '#msite'"></use>
            </svg> -->
            <!-- <img src="../../assets/images/index.png" class="icon_style" alt=""> -->
            <i class="icon_style iconfont icon-home"></i>
            <span>首页</span>
        </section>
        <section @click="gotoAddress({path: '/chat'})" class="guide_item">
            <!-- <svg class="icon_style"> -->
                <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('chat') !== -1? '#findActive' : '#find'"></use> -->
            <!-- </svg> -->
            <!-- <img src="../../assets/images/code.png" class="icon_style" alt=""> -->
            <i class="icon_style iconfont icon-code"></i>
            <span>聊天室</span>
        </section>
        <section @click="gotoAddress('/getstar')" class="guide_item">
            <!-- <svg class="icon_style"> -->
                <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('getStar') !== -1? '#orderActive' : '#order'"></use> -->
            <!-- </svg> -->
            <i class="icon_style iconfont icon-search3"></i>
            <span>获取球星</span>
        </section>
        <section @click="gotoAddress('/profile')" class="guide_item">
            <!-- <svg class="icon_style"> -->
                <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('profile') !== -1? '#profileActive' : '#profile'"></use> -->
            <!-- </svg> -->
             <!-- <img src="../../assets/images/member.png" class="icon_style" alt=""> -->
             <i class="icon_style iconfont icon-account"></i>
            <span>我的球员</span>
        </section>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    gotoAddress (path) {
      const info = this.userInfo
      const id = (this.userInfo && this.userInfo.id) || '' // 这里userInfo有多种值 所有有这种复杂的写法
      if ((info === null || info === '' || !id) && path.path !== '/') {
          // 没有用户信息需要重新登录
        this.$router.push({path: '/login'})
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/mixin';
.iconfont {
    font-size: 22px
}
#foot_guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 50px);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
}

.guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .icon_style {
        @include wh(24px, 24px);
        margin-bottom: 5px;
        margin-top: 5px;
        fill: #ccc;
    }
    span {
        @include sc(10px, #666);
    }
}
</style>
