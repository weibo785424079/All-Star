<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <!-- <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" /> -->
                <polyline points="12,48 4,39 12,30" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
            </svg>
        </section>
        <!-- <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login"> -->
        <b  v-if='signinUp' class="head_login">
            <!-- <svg class="user_avatar" v-if="userInfo"> -->
                <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use> -->
            <!-- </svg> -->
            <span class="login_span" @click="logOut"  v-if='logined'>退出</span>
            <span class="login_span" @click="logIn" v-else>登录|注册</span>
        </b>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { MessageBox } from 'mint-ui'
import userApi from '@/api/account'
export default {
  data () {
    return {
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.$bus.$emit('bus')
    // }, 2000)
  },
  props: ['signinUp', 'headTitle', 'goBack'],
  computed: {
    ...mapState([
      'userInfo'
    ]),
    logined () {
      return Object.keys(this.userInfo || {}).length > 0
    }
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    logOut () {
      MessageBox.confirm('', {
        message: '确定退出当前账户？',
        title: '提示'
      }).then(action => {
        if (action === 'confirm') {
          userApi.logOut().then(res => {
            if (res.data.status === 200) {
              this.$store.commit('GET_USERINFO', null)
              this.$router.push({
                path: '/index'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    logIn () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../static/mixin';
#head_top {
    // background-color: $blue;
    background-color: #5bb783;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1rem);
}

.head_goback {
    left: 0.4rem;
    // @include wh(0.6rem, 1rem);
    @include wh(35px, 35px);
    line-height: 1rem;
    margin-left: .4rem;
}

.head_login {
    right: 0.55rem;
    @include sc(14px, #fff);
    @include ct;
    .login_span {
        color: #fff;
    }
    .user_avatar {
        fill: #fff;
        @include wh(24px, 24px);
    }
}

.title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(20px, #fff);
        text-align: center;
    }
}
</style>
