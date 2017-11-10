<template>
  <div class="out">
     <section class="user-info" @click="setInfo">
        <img v-if="moreInfo.pic" :src="moreInfo.pic" alt="img">
        <p v-else>上传头像</p>
        <div class="info">
            <p class="name">昵称：{{moreInfo.nick_name || '设置昵称'}}</p>
            <p class="team">拥有球队：{{moreInfo.team}}</p>
            <p class="level">简介: {{moreInfo.desc || '...'}}</p>            
        </div>
     </section>      
     <section class="activity-module">
         <ul class="list">
             <li>
                 <i class="iconfont icon-account"></i>
                 <router-link class="item" tag="div" to="/profile">我的球员</router-link>
                 <i class="iconfont  icon-more2"></i>                 
             </li>
             <li>
                 <i class="iconfont icon-account"></i>
                 <router-link tag="div" to="/profile">我的球队</router-link>
             </li>
             <li>
                 <i class="iconfont icon-gaojian-zuozhe"></i>
                 <router-link to="">博客</router-link>
            </li>
             <li>
                 <i class="iconfont icon-market"></i>
                 <router-link to="">商城</router-link>
            </li>
             <li>
                 <i class="iconfont icon-games"></i>
                 <router-link tag="div" to="/games">游戏</router-link>
            </li>
             <li>
                 <i class="iconfont icon-games"></i>
                 <router-link to="">更多</router-link>
            </li>
         </ul>
     </section>
     <section class="personal-interest"></section>
  </div>
</template>

<script>
import { Observable } from 'rxjs'
import userApi from '@/api/account'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      moreInfo: {}
    }
  },
  components: {},
  mounted () {
    Observable.fromPromise(userApi.getUserMoreInfo({ uid: this.userInfo.id })).subscribe(res => {
      this.moreInfo = res.data.data
    })
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    setInfo () {
      this.$router.push('/setInfo')
    }
  }
}
</script>

<style lang='scss' scoped>
.out {
     padding-top: 1rem;
     overflow: hidden;
     height: 100%;
}
  .user-info {
      height: 110px;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      align-items: center;
      background: #fff;
      padding-left: 20px;
      img {
          height: 80px;
          width: 80px;
          margin-right: 10px;
          border-radius: 50%;       
      }
      .info {
          flex: 1;
          height: 100%;
          padding: 10px;
          text-align: left;
          p {
              line-height: 24px;
              font-size: 16px;
              margin-bottom: 3px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 230px
          }
      }
  }

  .activity-module {
      background: #fff;
      margin-top: 30px;
      padding-bottom: 3px;
      .border {
          border-bottom: 0.05px solid #ccc;
      }
      border-top:  0.05px solid #ccc;
      border-bottom: 0.05px solid #ccc;
      .list {
          margin-top: 10px;
          padding-left: 50px;
          padding-right: 10px;
          .iconfont:first-child {
              position: absolute;
              margin-left: -33px;
              font-size: 20px;
          }
          .iconfont:last-child {
              position: absolute;
              font-size: 10px;
              right: 10px
          }
      }
      li {
          text-align: left;
          line-height: 35px;
          padding-top: 3px;
          font-size: 18px;
          @extend .border;
          .item {
              .iconfont {
                  font-size: 24px;
                  margin-left: 100px;
              }
          }
      }
      li:last-child {
          border: 0
      }
  }

</style>
